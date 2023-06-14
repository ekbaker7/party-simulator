import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword, verifyPassword } from "../../../lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import validator from "validator";
import { UpdateUserType } from "../../../data/dbModels";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, oldPassword, newPassword, confirmPassword } = req.body;
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
        valid: validator.isLength(oldPassword, {
          min: 1,
        }),
        errorMessage: "Password is invalid.",
      },
      {
        valid: validator.isStrongPassword(newPassword),
        errorMessage: "Password does not meet complexity requirements.",
      },
      {
        valid: validator.equals(newPassword, confirmPassword),
        errorMessage: "Passwords do not match.",
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
      oldPassword,
      existingUser.password
    );

    if (!passwordsMatch) {
      res.status(401).json({ errorMessage: "Password is invalid." });
      return;
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedPassword: UpdateUserType = {
      password: hashedPassword,
    };

    // Maybe return validation here in the future?
    const updatedUser = await userRepository.updateDocumentByIdAndReturn(existingUser._id, updatedPassword);

    res.status(200).json({ success: true });
    return;
  }
  res.status(403);
}
