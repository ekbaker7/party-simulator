import { FindOptions } from "mongodb";
import BaseRepository from "./baseRepository";
import { UserInfoType } from "@/data/dbModels";

export default class UserRepository extends BaseRepository {
    constructor() {
        super("users");
    }

    fetchUserByEmail = async (email: string): Promise<UserInfoType | null> => {
      let findOptions: FindOptions<UserInfoType> = {
        projection: { email: 1, username: 1, password: 1 },
      };
    
      const user = await this.fetchOne(
        { email },
        findOptions
      );
    
      return user as UserInfoType | null;
    }

    fetchUserByUsername = async (username: string): Promise<UserInfoType | null> => {
      let findOptions: FindOptions<UserInfoType> = {
        projection: { email: 1, username: 1, password: 1 },
      };
    
      const user = await this.fetchOne(
        { username },
        findOptions
      );
    
      return user as UserInfoType | null;
    }

    fetchUserByEmailOrUsername = async (
      email: string,
      username: string
    ): Promise<UserInfoType | null> => {
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
    
      const user = await this.fetchOne(
        filterOptions,
        findOptions
      );
    
      return user as UserInfoType | null;
    }
}