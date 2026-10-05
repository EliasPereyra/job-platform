import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { username } from "better-auth/plugins";
import { passkey } from "@better-auth/passkey";
import { Pool } from "pg";

import { favorites } from "../favorites/favorites-plugin";
import { parsePasskeySignUp } from "./utils/passkey-sign-up";

const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  appName: "WorkStart",
  baseURL,
  database: new Pool({ connectionString: process.env.DATABASE_URL }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
  plugins: [
    username(),
    passkey({
      rpName: "WorkStart",
      rpID: new URL(baseURL).hostname,
      origin: baseURL,
      // Passkey-first sign-up: the account is created when the passkey is
      // verified, so a user can register without ever setting a password.
      registration: {
        requireSession: false,
        resolveUser: async ({ ctx, context }) => {
          const data = parsePasskeySignUp(context);
          if (!data)
            throw APIError.from("BAD_REQUEST", {
              code: "INVALID_SIGN_UP",
              message: "Datos de registro inválidos",
            });

          const existing = await ctx.context.internalAdapter.findUserByEmail(
            data.email,
          );
          if (existing)
            throw APIError.from("BAD_REQUEST", {
              code: "USER_ALREADY_EXISTS",
              message: "Ya existe una cuenta con ese email",
            });

          return {
            id: crypto.randomUUID(),
            name: data.email,
            displayName: data.name,
          };
        },
        afterVerification: async ({ ctx, user, context }) => {
          if (await ctx.context.internalAdapter.findUserById(user.id)) return;

          const data = parsePasskeySignUp(context);
          if (!data)
            throw APIError.from("BAD_REQUEST", {
              code: "INVALID_SIGN_UP",
              message: "Datos de registro inválidos",
            });

          if (await ctx.context.internalAdapter.findUserByEmail(data.email)) {
            throw APIError.from("BAD_REQUEST", {
              code: "USER_ALREADY_EXISTS",
              message: "Ya existe una cuenta con ese email",
            });
          }

          const created = await ctx.context.internalAdapter.createUser(
            { id: user.id, name: data.name, email: data.email },
            { method: "passkey" },
          );
          return { userId: created.id };
        },
      },
    }),
    favorites(),
  ],
});

export type Session = typeof auth.$Infer.Session;
