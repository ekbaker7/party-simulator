import { UserInfo, NewUserInfo } from "../dbModels";
import { FindOptions } from "mongodb";
import {
  connectDatabase,
  getDocumentForCollection,
  insertDocument,
} from "../dbUtils";

const collection = "users";

export async function fetchUserByEmail(email: string): Promise<UserInfo> {
  const client = await connectDatabase();

  let findOptions: FindOptions<UserInfo> = {
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

export async function saveNewUser(user: NewUserInfo): Promise<any> {
  const client = await connectDatabase();
  const newUser = await insertDocument(client, collection, user);

  return newUser;
}
