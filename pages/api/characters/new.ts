import { NextApiRequest, NextApiResponse } from "next";
import CharacterRepository from "@/lib/repositories/characterRepository";
import {
  CharacterModel,
  CharacterStatsModel,
  CharacterRelationshipModel,
} from "@/data/database-models/characterModels";
import { ObjectId } from "mongodb";
import { decodeToken } from "@/lib/authUtils";
import UserRepository from "@/lib/repositories/userRepository";
import Pronouns from "@/data/character-data/pronouns";
import Classes from "@/data/character-data/classes";
import Professions from "@/data/character-data/professions";
import { ConvertEquipmentModelToSimpleEquipmentModel, EquipmentModel } from "@/data/database-models/equipmentModels";
import generateCharacter, { CharacterGenerationOptions } from "@/lib/character-utils/generateCharacter";

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

    const characterStats: CharacterStatsModel = {
      physical: 0,
      magical: 0,
      charisma: 0,
    };

    const newCharacter: CharacterModel = {
      _id: new ObjectId(),
      userId: existingUser._id,    
      relationships: [] as CharacterRelationshipModel[],
      ...generatedCharacter,
      equipment: generatedCharacter.equipment.map(equip => ConvertEquipmentModelToSimpleEquipmentModel(equip)),
    };

    res.status(200).json({ newCharacter });
    return;
  }

  res.status(404).json({ errorMessage: "Not found" });
  return;
}
