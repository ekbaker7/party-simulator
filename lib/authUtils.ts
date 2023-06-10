import { compare, hash } from "bcrypt";
import * as jose from "jose";
import jwt from "jsonwebtoken";
import {
  connectDatabase,
  getDocumentForCollection,
  insertDocument,
} from "./dbUtils";
import { UserInfo, NewUserInfo } from "./dbModels";
import { FindOptions } from "mongodb";

const alg = "HS256";
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function fetchUserByEmail(email: string): Promise<UserInfo> {
  const client = await connectDatabase();

  let findOptions: FindOptions<UserInfo> = {
    projection: { email: 1, username: 1, password: 1 },
  };

  const user = await getDocumentForCollection(
    client,
    "users",
    { email },
    findOptions
  );

  return user;
}

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

export async function saveNewUser(user: NewUserInfo): Promise<any> {
  const client = await connectDatabase();
  const newUser = await insertDocument(client, "users", user);

  return newUser;
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
