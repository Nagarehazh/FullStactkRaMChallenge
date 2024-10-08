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
        const queryBuilder = this.repository
            .createQueryBuilder('character')
            .leftJoinAndSelect('character.favorites', 'favorites')
            .leftJoinAndSelect('character.comments', 'comments')
            .where('character.deleted_at IS NULL');

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                if (key === 'name') {
                    queryBuilder.andWhere(`REPLACE(character.${key}, ' ', '') ILIKE :${key}`, { [key]: `%${value.replace(/\s+/g, '')}%` });
                } else {
                    queryBuilder.andWhere(`character.${key} = :${key}`, { [key]: value });
                }
            }
        });

        const characters = await queryBuilder.getMany();

        return characters.map(character => ({
            ...character,
            favorites: character.favorites || [],
            comments: character.comments || [],
        }));
    }

    async findCharacterById(id: string): Promise<Characters | null> {
        return await this.repository.findOne({
            where: { id },
            relations: ['comments', 'favorites']
        });
    }
}