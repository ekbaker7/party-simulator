import { FindOptions } from "mongodb";
import BaseRepository from "./baseRepository";
import { UserInfoModel } from "@/data/database-models/userModels";

export default class UserRepository extends BaseRepository {
    constructor() {
        super("users");
    }

    fetchUserByEmail = async (email: string): Promise<UserInfoModel | null> => {
      let findOptions: FindOptions<UserInfoModel> = {
        projection: { email: 1, username: 1, password: 1 },
      };
    
      const user = await this.fetchOne(
        { email },
        findOptions
      );
    
      return user as UserInfoModel | null;
    }

    fetchUserByUsername = async (username: string): Promise<UserInfoModel | null> => {
      let findOptions: FindOptions<UserInfoModel> = {
        projection: { email: 1, username: 1, password: 1 },
      };
    
      const user = await this.fetchOne(
        { username },
        findOptions
      );
    
      return user as UserInfoModel | null;
    }

    fetchUserByEmailOrUsername = async (
      email: string,
      username: string
    ): Promise<UserInfoModel | null> => {
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
    
      let findOptions: FindOptions<UserInfoModel> = {
        projection: { email: 1, username: 1, password: 1 },
      };
    
      const user = await this.fetchOne(
        filterOptions,
        findOptions
      );
    
      return user as UserInfoModel | null;
    }
}