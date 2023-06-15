import { WithId, Document } from "mongodb";

export interface UserInfoModel extends WithId<Document> {
  username: string;
  email: string;
}

export interface NewUserModel {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface NewUserToSaveModel {
  username: string;
  email: string;
  password: string;
}

export interface ChangePasswordModel {
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateUserModel {
  password: string;
}
