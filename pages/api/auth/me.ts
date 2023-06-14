import { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import { UserInfoType } from "../../../data/dbModels";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"] as string;
  const token = bearerToken.split(" ")[1];

  const returnedObj = (await decodeToken(token)) as {
    payload: { email: string };
    error: any;
  };

  if (!returnedObj.payload || !returnedObj.payload.email || returnedObj.error) {
    res.status(401).json({ errorMessage: "Unauthorized request" });
    return;
  }

  const userRepository = new UserRepository();

  const existingUser = await userRepository.fetchUserByEmail(returnedObj.payload.email);

  if (!existingUser) {
    res.status(401).json({ errorMessage: "Unauthorized request" });
    return;
  }

  const userInfo: UserInfoType = {
    _id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email
  }

  res.status(200).json(userInfo);
  return;
}
