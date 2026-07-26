import crypto from "crypto";

export interface SessionPayload {
  email: string;
  name?: string;
  picture?: string;
  iat?: number;
  exp?: number;
}

/**
 * Signs a JWT token with HS256 algorithm.
 */
export function signJWT(
  payload: SessionPayload,
  secret: string,
  expiresInSeconds: number = 7 * 24 * 60 * 60 // Default: 7 days
): string {
  const header = { alg: "HS256", typ: "JWT" };
  const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const base64Payload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");

  const signatureInput = `${base64Header}.${base64Payload}`;
  const signature = crypto
    .createHmac("sha256", secret)
    .update(signatureInput)
    .digest("base64url");

  return `${signatureInput}.${signature}`;
}

/**
 * Verifies a JWT token and returns its payload if valid, otherwise null.
 */
export function verifyJWT(token: string, secret: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const signatureInput = `${header}.${payload}`;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(signatureInput)
      .digest("base64url");

    if (signature !== expectedSignature) return null;

    const decodedPayload = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8")
    ) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (decodedPayload.exp && now > decodedPayload.exp) {
      return null;
    }

    return decodedPayload;
  } catch (error) {
    console.error("JWT Verification error:", error);
    return null;
  }
}
