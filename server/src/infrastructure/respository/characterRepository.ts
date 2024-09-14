import { AppDataSource } from "../../configs/postgres/datasource";
import { Characters } from "../../entity/characters";
import { Repository } from "typeorm";
import {CharacterFilters} from "../../service/characterService";

export default class CharacterRepository {
    private repository: Repository<Characters>;

    constructor() {
        this.repository = AppDataSource.getRepository(Characters);
    }

    async createOrUpdateCharacter(characterData: Partial<Characters>): Promise<{ character: Characters, isNew: boolean }> {
        let character = await this.findCharacterByName(characterData.name || '');
        if (character) {
            this.repository.merge(character, characterData);
            const updatedCharacter = await this.repository.save(character);
            return { character: updatedCharacter, isNew: false };
        } else {
            character = this.repository.create(characterData);
            const newCharacter = await this.repository.save(character);
            return { character: newCharacter, isNew: true };
        }
    }

    async findCharacterByName(name: string): Promise<Characters | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async getCharacterCount(): Promise<number> {
        return await this.repository.count();
    }

    async getCharacters(filters: CharacterFilters): Promise<Characters[]> {
        const queryBuilder = this.repository.createQueryBuilder('characters');

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                if (key === 'name') {
                    queryBuilder.andWhere(`REPLACE(characters.${key}, ' ', '') ILIKE :${key}`, { [key]: `%${value.replace(/\s+/g, '')}%` });
                } else {
                    queryBuilder.andWhere(`characters.${key} = :${key}`, { [key]: value });
                }
            }
        });

        return await queryBuilder.getMany();
    }

}