import { ObjectId, WithId, Document } from "mongodb";
import Pronouns from "../character-data/pronouns";
import Classes from "../character-data/classes";
import Professions from "../character-data/professions";
import { EquipmentModel, SimpleEquipmentModel } from "./equipmentModels";

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

export interface CharacterModel extends WithId<Document> {
  userId: ObjectId;
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
  relationships: CharacterRelationshipModel[];
  equipment: SimpleEquipmentModel[];
}

export interface GeneratedCharacterModel {
  firstName: string;
  surname: string;
  nickname: string;
  pronouns: Pronouns;
  interestedIn: Pronouns[];
  class: Classes;
  profession: Professions;
  quote: string;
  age: number;
  stats: CharacterStatsModel;
  equipment: EquipmentModel[];
}
