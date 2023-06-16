import { NextApiRequest, NextApiResponse } from "next";
import {
  generateJWT,
  hashPassword,
} from "../../../lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import validator from "validator";
import { UserInfoModel, NewUserToSaveModel } from "../../../data/database-models/userModels";
import { setCookie } from "cookies-next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password, confirmPassword } = req.body;
    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validator.isLength(username, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Username is invalid.",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid.",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password does not meet complexity requirements.",
      },
      {
        valid: validator.equals(password, confirmPassword),
        errorMessage: "Passwords do not match.",
      }
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

    const existingUser = await userRepository.fetchUserByEmailOrUsername(email, username);

    if (existingUser) {
      res
        .status(401)
        .json({ errorMessage: "Account already exists for that email and/or username." });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser: NewUserToSaveModel = {
      username,
      email,
      password: hashedPassword,
    };

    const savedUser = await userRepository.saveNewDocument(newUser);

    const grabbedUser = await userRepository.fetchUserByUsername(username);

    if (!grabbedUser) {
      res
        .status(401)
        .json({ errorMessage: "Username or password is invalid." });
      return;
    }

    const jwtToken = await generateJWT(grabbedUser.email)

    setCookie("jwt", jwtToken, { req, res, maxAge: 604800})

    const userInfo: UserInfoModel = {
      _id: grabbedUser._id,
      email: grabbedUser.email,
      username: grabbedUser.username
    }

    res.status(200).json(userInfo);
    return;
  }
  res.status(403);
}
