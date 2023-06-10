import { WithId, Document, ObjectId } from "mongodb";

export interface UserInfo extends WithId<Document> {
    username: string;
    email: string;
}

export interface NewUserInfo {
    username: string;
    email: string;
    password: string;
}