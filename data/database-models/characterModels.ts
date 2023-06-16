import { ObjectId, WithId, Document } from "mongodb";
import Pronouns from "../character-data/pronouns";
import Classes from "../character-data/classes";
import Professions from "../character-data/professions";
import { EquipmentModel, SavableEquipmentModel, SimpleEquipmentModel } from "./equipmentModels";
import { PersonalityModel } from "../character-data/personalities";

export interface CharacterStatsModel {
  physical: number;
  magical: number;
  charisma: number;
}

export interface CharacterRelationshipModel {
  characterId: ObjectId;
  relationship: number;
  romantic: boolean;
}

export interface BaseCharacterModel extends WithId<Document> {
  firstName: string;
  surname: string;
  nickname: string;
  age: number;
  pronouns: Pronouns;
  interestedIn: Pronouns[];
  quote: string;
  class: Classes;
  profession: Professions;
  stats: CharacterStatsModel;
  level: number;
  experience: number;
  personality: PersonalityModel[]
}

export interface SavableCharacterModel extends BaseCharacterModel {
  userId: ObjectId;
  equipment: SavableEquipmentModel[];
  relationships: CharacterRelationshipModel[];  
}

export interface DisplayedCharacterModel extends BaseCharacterModel {
  equipment: SimpleEquipmentModel[];
  relationships: CharacterRelationshipModel[];  
}

export interface GeneratedCharacterModel extends BaseCharacterModel {
  equipment: EquipmentModel[];
}