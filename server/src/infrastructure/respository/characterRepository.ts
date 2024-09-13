import { AppDataSource } from "../../configs/postgres/datasource";
import { Characters } from "../../entity/characters";
import { Repository } from "typeorm";

export default class CharacterRepository {
    private repository: Repository<Characters>;

    constructor() {
        this.repository = AppDataSource.getRepository(Characters);
    }

    async createCharacter(characterData: Partial<Characters>): Promise<Characters> {
        const character = this.repository.create(characterData);
        return await this.repository.save(character);
    }

    async findCharacterByName(name: string): Promise<Characters | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async findOrCreateCharacter(characterData: Partial<Characters>): Promise<Characters> {
        const existingCharacter = await this.findCharacterByName(characterData.name || '');
        if (existingCharacter) {
            return existingCharacter;
        }
        return await this.createCharacter(characterData);
    }
}