import { print } from "graphql/language/printer";
import gql from "graphql-tag";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { ContentNode, LoginPayload } from "@/gql/graphql";
import { fetchGraphQL } from "@/utils/fetchGraphQL";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const id = searchParams.get("id");

  if (secret !== process.env.HEADLESS_SECRET || !id) {
    return new Response("Invalid token", { status: 401 });
  }

  const mutation = gql`
  mutation LoginUser {
    login( input: {
      clientMutationId: "uniqueId",
      username: "${process.env.WP_USER}",
      password: "${process.env.WP_APP_PASS}"
    } ) {
      authToken
      user {
        id
        name
      }
    }
  }
`;

  const { login } = await fetchGraphQL<{ login: LoginPayload }>(
    print(mutation)
  );

  const authToken = login.authToken;

  (await draftMode()).enable();

  const query = gql`
    query GetContentNode($id: ID!) {
      contentNode(id: $id, idType: DATABASE_ID) {
        uri
        status
        databaseId
      }
    }
  `;

  const { contentNode } = await fetchGraphQL<{ contentNode: ContentNode }>(
    print(query),
    {
      id,
    },
    { Authorization: `Bearer ${authToken}` }
  );

  if (!contentNode) {
    return new Response("Invalid id", { status: 401 });
  }

  const response = NextResponse.redirect(
    `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }${
      contentNode.status === "draft"
        ? `/preview/${contentNode.databaseId}`
        : contentNode.uri
    }`
  );

  response.headers.set("Set-Cookie", `wp_jwt=${authToken}; path=/;`);

  return response;
}
