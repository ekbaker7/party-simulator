import { DisplayedCharacterModel } from "@/data/database-models/characterModels";
import BaseRepository from "./baseRepository";

export default class CharacterRepository extends BaseRepository {
    constructor() {
        super("characters");
    }

    fetchAllCharactersForUser = async (userId: string): Promise<DisplayedCharacterModel[]> => {
        if (!this.client) {
            await this.connectDatabase();
        }
        const documents = await this.fetchAll({ userId: this.convertToObjectId(userId) });
        return documents as DisplayedCharacterModel[];
    }
}