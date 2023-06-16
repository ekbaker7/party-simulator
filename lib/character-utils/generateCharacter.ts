import {
  Classes,
  PhysicalClasses,
  MagicalClasses,
} from "@/data/character-data/classes";
import Pronouns from "@/data/character-data/pronouns";
import _, { eq } from "lodash";
import { FirstNames, Surnames, Nicknames } from "@/data/character-data/names";
import { Quotes } from "@/data/character-data/quotes";
import {
  CharacterStatsModel,
  GeneratedCharacterModel,
} from "@/data/database-models/characterModels";
import Professions from "@/data/character-data/professions";
import { EquipmentModel } from "@/data/database-models/equipmentModels";
import { AllEquipment } from "@/data/equipment-data/equipmentList";
import { EquipmentTypes } from "@/data/equipment-data/equipmentTypes";
import { ObjectId } from "mongodb";
import {
  PersonalityModel,
  Personalities,
} from "@/data/character-data/personalities";

export interface CharacterGenerationOptions {
  pronouns?: Pronouns;
  interestedIn?: Pronouns[];
  job?: Classes;
  profession?: Professions;
}

enum OrientationOptions {
  Straight = "Straight",
  Gay = "Gay",
  Bi = "Bi",
  Pan = "Pan",
  Ace = "Ace",
}

export default function generateCharacter(
  characterGenerationOptions: CharacterGenerationOptions
): GeneratedCharacterModel {
  const newCharacter: GeneratedCharacterModel = {
    _id: new ObjectId(),
    firstName: "",
    surname: "",
    nickname: "",
    pronouns: Pronouns.Other,
    interestedIn: [],
    class: Classes.Warrior,
    profession: Professions.Farmer,
    age: 0,
    quote: "",
    stats: {
      physical: 0,
      magical: 0,
      charisma: 0,
    },
    equipment: [],
    level: 1,
    experience: 0,
    personality: [],
  };

  if (!characterGenerationOptions?.pronouns) {
    newCharacter.pronouns = getPronouns();
  } else {
    newCharacter.pronouns = characterGenerationOptions.pronouns;
  }

  newCharacter.firstName = getFirstName(newCharacter.pronouns);
  newCharacter.surname = getSurname();
  newCharacter.nickname = getNickname();
  newCharacter.quote = getQuote();
  newCharacter.age = getAge();

  if (!characterGenerationOptions?.interestedIn) {
    newCharacter.interestedIn = getInterestedIn(newCharacter.pronouns);
  } else {
    newCharacter.interestedIn = characterGenerationOptions.interestedIn;
  }

  if (!characterGenerationOptions?.job) {
    newCharacter.class = getClass();
  } else {
    newCharacter.class = characterGenerationOptions.job;
  }

  if (!characterGenerationOptions?.profession) {
    newCharacter.profession = getProfession();
  } else {
    newCharacter.profession = characterGenerationOptions.profession;
  }

  newCharacter.stats = generateStats(newCharacter.class);
  newCharacter.equipment = generateInitialEquipment(newCharacter.class);
  newCharacter.personality = generatePersonalities();

  return newCharacter;
}

function getPronouns(): Pronouns {
  return _.sample(Object.values(Pronouns)) as Pronouns;
}

function getFirstName(pronouns: Pronouns): string {
  switch (pronouns) {
    case Pronouns.Male:
      const usableMaleNames = [...FirstNames.MALE, ...FirstNames.OTHER];
      return _.sample(usableMaleNames) as string;
    case Pronouns.Female:
      const usableFemaleNames = [...FirstNames.FEMALE, ...FirstNames.OTHER];
      return _.sample(usableFemaleNames) as string;
    default:
      return _.sample(FirstNames.OTHER) as string;
  }
}

function getSurname(): string {
  return _.sample(Surnames) as string;
}

function getNickname(): string {
  return _.sample(Nicknames) as string;
}

function getInterestedIn(pronouns: Pronouns): Pronouns[] {
  const orientation = GetOrientationFromRand();

  switch (orientation) {
    case OrientationOptions.Straight:
      switch (pronouns) {
        case Pronouns.Male:
          return [Pronouns.Female];
        case Pronouns.Female:
          return [Pronouns.Male];
        default:
          return [getPronouns()];
      }
    case OrientationOptions.Gay:
      switch (pronouns) {
        case Pronouns.Male:
          return [Pronouns.Male];
        case Pronouns.Female:
          return [Pronouns.Female];
        default:
          return [getPronouns()];
      }
    case OrientationOptions.Bi:
      return [Pronouns.Male, Pronouns.Female];
    case OrientationOptions.Pan:
      return [Pronouns.Male, Pronouns.Female, Pronouns.Other];
    default:
      return [];
  }
}

function GetOrientationFromRand(): OrientationOptions {
  const rand = _.random(0, 100);

  if (rand <= 60) {
    return OrientationOptions.Straight;
  } else if (rand <= 80) {
    return OrientationOptions.Gay;
  } else if (rand <= 90) {
    return OrientationOptions.Bi;
  } else if (rand <= 95) {
    return OrientationOptions.Pan;
  } else {
    return OrientationOptions.Ace;
  }
}

function getClass(): Classes {
  return _.sample(Object.values(Classes)) as Classes;
}

function getProfession(): Professions {
  return _.sample(Object.values(Professions)) as Professions;
}

function getQuote(): string {
  return _.sample(Quotes) as string;
}

function getAge(): number {
  return _.random(18, 75);
}

function generateStats(job: Classes): CharacterStatsModel {
  let physical = 0;
  let charisma = 0;
  let magical = 0;
  let remainingPoints = 20;

  let primaryStat = _.random(9, 13);
  remainingPoints -= primaryStat;
  let secondaryStat = _.random(6, remainingPoints - 3);
  remainingPoints -= secondaryStat;
  let tertiaryStat = remainingPoints;

  if (PhysicalClasses.includes(job)) {
    physical = primaryStat;
    magical = secondaryStat;
    charisma = tertiaryStat;
  } else if (MagicalClasses.includes(job)) {
    magical = primaryStat;
    charisma = secondaryStat;
    physical = tertiaryStat;
  } else {
    charisma = primaryStat;
    physical = secondaryStat;
    magical = tertiaryStat;
  }

  return {
    physical,
    charisma,
    magical,
  };
}

function generateInitialEquipment(job: Classes): EquipmentModel[] {
  let equipment: EquipmentModel[] = [];
  let remainingCost = 20;

  let availableEquipment = _.cloneDeep(AllEquipment).filter(
    (equip) =>
      equip.equippableClasses.includes(job) && equip.price <= remainingCost
  );

  while (remainingCost > 0 && availableEquipment.length > 0) {
    let equipmentPiece = getEquipmentPieceForClass(availableEquipment);
    equipment.push(equipmentPiece);
    remainingCost -= equipmentPiece.price;
    availableEquipment = filterRemainingEquipment(
      availableEquipment,
      equipmentPiece,
      remainingCost,
      equipment
    );
  }

  return equipment;
}

function getEquipmentPieceForClass(
  availableEquipment: EquipmentModel[]
): EquipmentModel {
  return _.sample(availableEquipment) as EquipmentModel;
}

function filterRemainingEquipment(
  availableEquipment: EquipmentModel[],
  newEquipment: EquipmentModel,
  remainingCost: number,
  AllEquipment: EquipmentModel[]
): EquipmentModel[] {
  // First, filter anything no longer within our price range
  let newAvailableEquipment = availableEquipment.filter(
    (equip) => equip.price <= remainingCost
  );

  if (!newAvailableEquipment?.length) {
    return [];
  }

  // If they should only be able to have one of this item, remove it from the list
  if (newEquipment.unique) {
    newAvailableEquipment = newAvailableEquipment.filter(
      (equip) => equip.id !== newEquipment.id
    );
  }

  if (!newAvailableEquipment?.length) {
    return [];
  }

  // Remove any items that conflict with the new item
  newAvailableEquipment = newAvailableEquipment.filter((equip) => {
    let equipType = EquipmentTypes[equip.type];
    if (equipType.conflictsWith.includes(newEquipment.type)) {
      return false;
    }

    return true;
  });

  if (!newAvailableEquipment?.length) {
    return [];
  }

  // Now, remove anything that they have the 'max' equippable amount of
  newAvailableEquipment = newAvailableEquipment.filter((equip) => {
    let equipType = EquipmentTypes[equip.type];
    let allPiecesOfType = AllEquipment.filter(
      (ae) => ae.type === equip.type
    ).length;
    if (allPiecesOfType >= equipType.maxEquippable) {
      return false;
    }

    return true;
  });

  return newAvailableEquipment;
}

function generatePersonalities(): PersonalityModel[] {
  let personalities: PersonalityModel[] = [];
  let allPersonalities = _.cloneDeep(Personalities);

  for (let i = 0; i < 3; i++) {
    allPersonalities = generatePersonalityAndFilterList(allPersonalities, personalities);
  }
  
  return personalities;
}

function generatePersonalityAndFilterList (remainingPersonalities: PersonalityModel[], personalities: PersonalityModel[]): PersonalityModel[] {
  let personality = _.sample(remainingPersonalities) as PersonalityModel;
  personalities.push(personality)
  remainingPersonalities = filterRemainingPersonalities(remainingPersonalities, personality);
  return remainingPersonalities;
}

function filterRemainingPersonalities(
  remainingPersonalities: PersonalityModel[],
  newPersonality: PersonalityModel
): PersonalityModel[] {
  // First, remove the chosen personality
  // Then, remove any personalities the newPersonality is incompatible with
  // Then, remove any personalities incompatible with the newPersonality
  //    (that somehow did not get picked up the first time, in case I missed a 2-way incompatibility)
  let newAvailablePersonalities = _.cloneDeep(remainingPersonalities).filter(
    (personality) =>
      personality.Id !== newPersonality.Id &&
      !newPersonality.Incompatibile.includes(personality.Id) &&
      !personality.Incompatibile.includes(newPersonality.Id)
  );

  return newAvailablePersonalities;
}
