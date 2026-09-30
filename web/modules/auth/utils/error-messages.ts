const MESSAGES: Record<string, string> = {
  INVALID_EMAIL: "El email no es válido.",
  INVALID_EMAIL_OR_PASSWORD: "Email o contraseña incorrectos.",
  INVALID_USERNAME_OR_PASSWORD: "Usuario o contraseña incorrectos.",
  INVALID_USERNAME:
    "El usuario solo puede tener letras, números, guiones bajos y puntos.",
  USERNAME_IS_ALREADY_TAKEN: "Ese nombre de usuario ya está en uso.",
  USERNAME_TOO_SHORT: "El usuario debe tener al menos 3 caracteres.",
  USERNAME_TOO_LONG: "El usuario es demasiado largo.",
  PASSWORD_TOO_SHORT: "La contraseña debe tener al menos 8 caracteres.",
  USER_ALREADY_EXISTS: "Ya existe una cuenta con ese email.",
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "Ya existe una cuenta con ese email.",
  AUTH_CANCELLED: "Cancelaste el uso de la passkey.",
  REGISTRATION_CANCELLED: "Cancelaste la creación de la passkey.",
  PREVIOUSLY_REGISTERED: "Esta passkey ya está registrada.",
  PASSKEY_NOT_FOUND: "No encontramos una cuenta para esa passkey.",
  AUTHENTICATION_FAILED: "No pudimos verificar la passkey.",
  INVALID_SIGN_UP: "Revisá el nombre y el email.",
  ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY:
    "Se canceló la operación o se agotó el tiempo. Intentá de nuevo.",
  ERROR_CEREMONY_ABORTED: "Se canceló la operación con la passkey.",
  ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED: "Esta passkey ya está registrada.",
  ERROR_AUTHENTICATOR_GENERAL_ERROR:
    "Tu dispositivo o gestor de contraseñas no pudo completar la operación.",
  ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT:
    "Tu dispositivo no admite este tipo de passkey.",
  ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT:
    "Tu dispositivo no admite este tipo de passkey.",
  ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG:
    "Tu dispositivo no admite este tipo de passkey.",
  ERROR_INVALID_DOMAIN: "Las passkeys no están disponibles en este dominio.",
  ERROR_INVALID_RP_ID: "Las passkeys no están disponibles en este dominio.",
};

const FALLBACK = "Algo salió mal. Intentá de nuevo.";

export function getErrorMessage(
  error: { code?: string; message?: string } | null | undefined,
) {
  if (error?.code && MESSAGES[error.code]) return MESSAGES[error.code];
  console.warn("[auth]", error?.code, error?.message);
  return FALLBACK;
}

export function safeRedirect(
  next: string | null | undefined,
  fallback = "/perfil/",
) {
  return next && next.startsWith("/") && !next.startsWith("//")
    ? next
    : fallback;
}
