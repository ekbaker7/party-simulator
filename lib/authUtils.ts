import { compare, hash } from "bcrypt";
import * as jose from "jose";
import jwt from "jsonwebtoken";

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await compare(plainTextPassword, hashedPassword);
  return isValid;
}

export async function generateJWT(email: string): Promise<string> {
  const token = await new jose.SignJWT({ email })
    .setProtectedHeader({ alg })
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}

export function decodeToken(token: string): {
  payload: jwt.JwtPayload | null;
  error: any;
} {
  try {
    const payload = jwt.decode(token) as jwt.JwtPayload;

    return { payload: payload, error: null };
  } catch (error) {
    return { payload: null, error };
  }
}
