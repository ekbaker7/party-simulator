import { WithId, Document, ObjectId } from "mongodb";

export interface UserInfoType extends WithId<Document> {
    username: string;
    email: string;
}

export interface NewUserType {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface NewUserToSaveType {
    username: string;
    email: string;
    password: string;
}

export interface ChangePasswordType {
    username: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface UpdateUserType {
    password: string;
}

export interface CharacterStatsType {
    physical: number;
    magical: number;
    charisma: number;
}

export interface CharacterRelationshipType {
    characterId: ObjectId;
    relationship: number;
    romantic: boolean;
}

export interface EquipmentStatType {
    phyiscalAttack: number;
    physicalDefence: number;
    magicalAttack: number;
    magicalDefence: number;
    charismaAttack: number;
    charismaDefence: number;
}

export interface EquipmentType {
    name: string;
    description: string;
    type: string;
    stats: EquipmentStatType;
    price: number;
}

export interface CharacterType {
    firstName: string;
    surname: string;
    nickname: string;
    quote: string;
    class: string;
    profession: string;
    stats: CharacterStatsType;
    relationships: CharacterRelationshipType[];
    equipment: EquipmentType[]
}