import Classes from "../character-data/classes";
import EquipmentTypesList from "../equipment-data/equipmentTypes";

export interface EquipmentStatModel {
  phyiscalAttack: number;
  physicalDefence: number;
  magicalAttack: number;
  magicalDefence: number;
  charismaAttack: number;
  charismaDefence: number;
}

export interface EquipmentModel {
  id: number;
  name: string;
  description: string;
  type: EquipmentTypesList;
  stats: EquipmentStatModel;
  price: number;
  equippableClasses: Classes[];
  unique: boolean;
}

export interface SimpleEquipmentModel {
  id: number;
  name: string;
  description: string;
  type: EquipmentTypesList;
  stats: EquipmentStatModel;
}

export function ConvertEquipmentModelToSimpleEquipmentModel(
  equipmentModel: EquipmentModel
): SimpleEquipmentModel {
  return {
    id: equipmentModel.id,
    name: equipmentModel.name,
    description: equipmentModel.description,
    type: equipmentModel.type,
    stats: equipmentModel.stats,
  };
}
