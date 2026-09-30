export type PasskeySignUp = { name: string; email: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function serializePasskeySignUp(data: PasskeySignUp): string {
  return JSON.stringify({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
  });
}

export function parsePasskeySignUp(
  context: string | null | undefined,
): PasskeySignUp | null {
  if (!context) return null;
  try {
    const { name, email } = JSON.parse(context);
    if (typeof name !== "string" || typeof email !== "string") return null;
    if (!name.trim() || !EMAIL_PATTERN.test(email)) return null;

    return { name: name.trim(), email: email.trim().toLowerCase() };
  } catch {
    return null;
  }
}
