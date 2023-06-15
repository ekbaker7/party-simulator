export enum EquipmentTypesList {
  OneHanded = "OneHanded",
  TwoHanded = "TwoHanded",
  Head = "Head",
  Body = "Body",
  Hands = "Hands",
  Legs = "Legs",
  Feet = "Feet",
  Accessory = "Accessory"
}

export const EquipmentTypes: {
  [key: string]: {
    maxEquippable: number;
    conflictsWith: string[];
  };
} = {
  OneHanded: {
    maxEquippable: 2,
    conflictsWith: [EquipmentTypesList.TwoHanded],
  },
  TwoHanded: {
    maxEquippable: 1,
    conflictsWith: [EquipmentTypesList.OneHanded],
  },
  Head: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  Body: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  Hands: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  Legs: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  Feet: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  Accessory: {
    maxEquippable: 2,
    conflictsWith: [],
  }
};

export default EquipmentTypesList;