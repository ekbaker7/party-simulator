import { UserInfoType, NewUserToSaveType, UpdateUserType } from "../../data/dbModels";
import { FindOptions, ObjectId } from "mongodb";
import {
  connectDatabase,
  getDocumentForCollection,
  insertDocument,
  updateDocumentByIdAndReturn,
} from "../dbUtils";

const collection = "users";

export async function fetchUserByEmail(email: string): Promise<UserInfoType> {
  const client = await connectDatabase();

  let findOptions: FindOptions<UserInfoType> = {
    projection: { email: 1, username: 1, password: 1 },
  };

  const user = await getDocumentForCollection(
    client,
    collection,
    { email },
    findOptions
  );

  return user;
}

export async function fetchUserByUsername(username: string): Promise<UserInfoType> {
  const client = await connectDatabase();

  let findOptions: FindOptions<UserInfoType> = {
    projection: { email: 1, username: 1, password: 1 },
  };

  const user = await getDocumentForCollection(
    client,
    collection,
    { username },
    findOptions
  );

  return user;
}

export async function fetchUserByEmailOrUsername(
  email: string,
  username: string
): Promise<UserInfoType> {
  const client = await connectDatabase();

  let filterOptions = {
    $or: [
      {
        email: `${email}`,
      },
      {
        username:  `${username}`
      },
    ],
  };

  let findOptions: FindOptions<UserInfoType> = {
    projection: { email: 1, username: 1, password: 1 },
  };

  const user = await getDocumentForCollection(
    client,
    collection,
    filterOptions,
    findOptions
  );

  return user;
}

export async function saveNewUser(user: NewUserToSaveType): Promise<any> {
  const client = await connectDatabase();
  const newUser = await insertDocument(client, collection, user);

  return newUser;
}

export async function updateUser(userId: ObjectId, updateInfo: UpdateUserType): Promise<any> {
  const client = await connectDatabase();
  const updatedUser = await updateDocumentByIdAndReturn(client, collection, userId, updateInfo);
  return updatedUser;
}