export interface JWTPayload {
  [key: string]: any;
}

export function decodeJWT(token: string): JWTPayload | null {
  try {
    // JWT format: header.payload.signature
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payload = parts[1];

    // base64url decode
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "="));
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}
