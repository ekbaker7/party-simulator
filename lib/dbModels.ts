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