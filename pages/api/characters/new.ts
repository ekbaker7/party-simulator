import { NextApiRequest, NextApiResponse } from "next";
import {
  CharacterRelationshipModel,
  DisplayedCharacterModel,
} from "@/data/database-models/characterModels";
import { decodeToken } from "@/lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import { ConvertEquipmentModelToSimpleEquipmentModel } from "@/data/database-models/equipmentModels";
import generateCharacter, {
  CharacterGenerationOptions,
} from "@/lib/character-utils/generateCharacter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const bearerToken = req.headers["authorization"] as string;

    if (!bearerToken) {
      res.status(401).json({ errorMessage: "Unauthorized request" });
      return;
    }

    const token = bearerToken.split(" ")[1];

    const returnedObj = (await decodeToken(token)) as {
      payload: { email: string };
      error: any;
    };

    if (
      !returnedObj.payload ||
      !returnedObj.payload.email ||
      returnedObj.error
    ) {
      res.status(401).json({ errorMessage: "Unauthorized request" });
      return;
    }

    const userRepository = new UserRepository();

    const existingUser = await userRepository.fetchUserByEmail(
      returnedObj.payload.email
    );

    if (!existingUser) {
      res.status(401).json({ errorMessage: "Unauthorized request" });
      return;
    }

    const { pronouns, interestedIn, job, profession } = req.body;

    const characterGenerationOptions: CharacterGenerationOptions = {
      pronouns,
      interestedIn,
      job,
      profession,
    };

    const generatedCharacter = generateCharacter(characterGenerationOptions);

    const newCharacter: DisplayedCharacterModel = {
      userId: existingUser._id,
      relationships: [] as CharacterRelationshipModel[],
      ...generatedCharacter,
      equipment: generatedCharacter.equipment.map((equip) =>
        ConvertEquipmentModelToSimpleEquipmentModel(equip)
      ),
    };

    res.status(200).json({ newCharacter });
    return;
  }

  res.status(404).json({ errorMessage: "Not found" });
  return;
}
