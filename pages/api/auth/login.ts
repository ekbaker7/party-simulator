import { NextApiRequest, NextApiResponse } from "next";
import {
  generateJWT,
  verifyPassword,
} from "../../../lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import { UserInfoModel } from "../../../data/database-models/userModels";
import validator from "validator";
import {setCookie} from "cookies-next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(username, {
            min: 1
        }),
        errorMessage: "Username is invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      res.status(401).json({ errorMessage: errors[0] });
      return;
    }

    const userRepository = new UserRepository();

    const existingUser = await userRepository.fetchUserByUsername(username);

    if (!existingUser) {
      res
        .status(401)
        .json({ errorMessage: "Username or password is invalid." });
      return;
    }

    const passwordsMatch = await verifyPassword(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      res.status(401).json({ errorMessage: "Username or password is invalid." });
      return;
    }

    const jwtToken = await generateJWT(existingUser.email);

    setCookie("jwt", jwtToken, { req, res, maxAge: 60 * 6 * 24})

    const userInfo: UserInfoModel = {
      _id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
    }

    res.status(200).json(userInfo);
    return;
  }
  res.status(403);
}
