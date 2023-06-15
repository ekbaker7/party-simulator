export enum Classes {
    Warrior = "Warrior",
    Mage = "Mage",
    Rogue = "Rogue",
    Cleric = "Cleric",
    Paladin = "Paladin",
    Ranger = "Ranger",
    Bard = "Bard",
    Druid = "Druid",
    Monk = "Monk",
    Barbarian = "Barbarian",
    Alchemist = "Alchemist",
    Spy = "Spy",
}

export const PhysicalClasses: Classes[] = [
    Classes.Warrior,
    Classes.Ranger,
    Classes.Monk,
    Classes.Barbarian
]

export const MagicalClasses: Classes[] = [
    Classes.Mage,
    Classes.Cleric,
    Classes.Druid,
    Classes.Alchemist
]

export const CharismaticClasses: Classes[] = [
    Classes.Paladin,
    Classes.Rogue,
    Classes.Bard,
    Classes.Spy
]

export default Classes