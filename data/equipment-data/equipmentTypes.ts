export const EquipmentTypes: {
  [key: string]: {
    maxEquippable: number;
    conflictsWith: string[];
  };
} = {
  "1-Handed": {
    maxEquippable: 2,
    conflictsWith: ["2-Handed", "shield", "offhand"],
  },
  "2-Handed": {
    maxEquippable: 1,
    conflictsWith: ["1-Handed", "shield", "offhand"],
  },
  shield: {
    maxEquippable: 1,
    conflictsWith: ["1-Handed", "2-Handed", "offhand"],
  },
  offhand: {
    maxEquippable: 1,
    conflictsWith: ["1-Handed", "2-Handed", "shield"],
  },
  head: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  body: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  hands: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  legs: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  feet: {
    maxEquippable: 1,
    conflictsWith: [],
  },
  accessory: {
    maxEquippable: 2,
    conflictsWith: [],
  }
};

export default EquipmentTypes;