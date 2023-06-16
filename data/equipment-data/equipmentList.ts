import { EquipmentModel, EquipmentStatModel} from "../database-models/equipmentModels";
import { EquipmentTypesList, EquipmentTypes } from "./equipmentTypes";
import { Classes, PhysicalClasses, MagicalClasses, CharismaticClasses } from "../character-data/classes";

const defaultStatsBlock: EquipmentStatModel = {
    phyiscalAttack: 0,
    physicalDefence: 0,
    magicalAttack: 0,
    magicalDefence: 0,
    charismaAttack: 0,
    charismaDefence: 0
}

export const OneHandedWeapons: EquipmentModel[] = [
    {
        id: 1,
        name: "Wooden Sword",
        description: "A sword made of wood. It's not very effective.",
        type: EquipmentTypesList.OneHanded,
        stats: {
            ...defaultStatsBlock,
            phyiscalAttack: 1,
            charismaAttack: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 2,
        name: "Wooden Shield",
        description: "A shield made of wood. It's not very effective.",
        type: EquipmentTypesList.OneHanded,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaAttack: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: true
    },
    {
        id: 3,
        name: "Stick (Wand)",
        description: "A stick. It's not very effective.",
        type: EquipmentTypesList.OneHanded,
        stats: {
            ...defaultStatsBlock,
            magicalAttack: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses],
        unique: true
    }
]

export const TwoHandedWeapons: EquipmentModel[] = [
    {
        id: 101,
        name: "Wooden Claymore",
        description: "A claymore made of wood. It's not very effective.",
        type: EquipmentTypesList.TwoHanded,
        stats: {
            ...defaultStatsBlock,
            phyiscalAttack: 2
        },
        price: 4,
        equippableClasses: [...PhysicalClasses],
        unique: false
    },
    {
        id: 102,
        name: "Crude bow",
        description: "A crudely made bow. It's not very effective.",
        type: EquipmentTypesList.TwoHanded,
        stats: {
            ...defaultStatsBlock,
            charismaAttack: 2
        },
        price: 4,
        equippableClasses: [...CharismaticClasses],
        unique: false
    },
]

export const Headgear: EquipmentModel[] = [
    {
        id: 201,
        name: "Wooden Helmet",
        description: "A helmet made of wood. It's not very effective.",
        type: EquipmentTypesList.Head,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 202,
        name: "Cloth Hood",
        description: "A simple cloth hood.",
        type: EquipmentTypesList.Head,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
]

export const BodyArmor: EquipmentModel[] = [
    {
        id: 301,
        name: "Wooden Chestplate",
        description: "A chestplate made of wood. It's not very effective.",
        type: EquipmentTypesList.Body,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 302,
        name: "Cloth Robe",
        description: "A simple cloth robe.",
        type: EquipmentTypesList.Body,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 303,
        name: "Bronze Chestplate",
        description: "A bronze chestplate. Better than scrounging.",
        type: EquipmentTypesList.Body,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 4,
            magicalDefence: 1,
            charismaDefence: 2
        },
        price: 18,
        equippableClasses: [...PhysicalClasses],
        unique: false
    },
    {
        id: 304,
        name: "Leather Jerkin",
        description: "A leather jerkin - Hey, if you're lucky, the arrow will hit you in the shoulder instead.",
        type: EquipmentTypesList.Body,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            magicalDefence: 1,
            charismaDefence: 2
        },
        price: 10,
        equippableClasses: [...CharismaticClasses, ...PhysicalClasses],
        unique: false
    },
]

export const Gloves: EquipmentModel[] = [
    {
        id: 401,
        name: "Wooden Gloves",
        description: "Gloves made of wood. It's not very effective, and *highly* uncomfortable to wear.",
        type: EquipmentTypesList.Hands,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 402,
        name: "Cloth Gloves",
        description: "Simple cloth gloves.",
        type: EquipmentTypesList.Hands,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
]

export const LegGear: EquipmentModel[] = [
    {
        id: 501,
        name: "Wooden Greaves",
        description: "Greaves made of wood. It's not very effective, and *highly* uncomfortable to wear.",
        type: EquipmentTypesList.Legs,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 502,
        name: "Cloth Pants",
        description: "Simple cloth pants.",
        type: EquipmentTypesList.Legs,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
]

export const Boots: EquipmentModel[] = [
    {
        id: 601,
        name: "Wooden Boots",
        description: "Boots made of wood. It's not very effective, and *highly* uncomfortable to wear.",
        type: EquipmentTypesList.Feet,
        stats: {
            ...defaultStatsBlock,
            physicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 602,
        name: "Cloth Shoes",
        description: "Simple cloth shoes.",
        type: EquipmentTypesList.Feet,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
]

export const Accessories: EquipmentModel[] = [
    {
        id: 701,
        name: "String Necklace",
        description: "A necklace fashioned from twine and other common materials.",
        type: EquipmentTypesList.Feet,
        stats: {
            ...defaultStatsBlock,
            charismaDefence: 1
        },
        price: 2,
        equippableClasses: [...PhysicalClasses, ...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
    {
        id: 702,
        name: "Silver Earrings",
        description: "A nice pair of dangly earrings. They're silver, so they're worth something, probably.",
        type: EquipmentTypesList.Feet,
        stats: {
            ...defaultStatsBlock,
            magicalDefence: 1,
        },
        price: 10,
        equippableClasses: [...PhysicalClasses, ...MagicalClasses,  ...CharismaticClasses],
        unique: false
    },
]

export const AllEquipment: EquipmentModel[] = [
    ...OneHandedWeapons,
    ...TwoHandedWeapons,
    ...Headgear,
    ...BodyArmor,
    ...Gloves,
    ...LegGear,
    ...Boots,
    ...Accessories
]

export default AllEquipment;