import { Resolver, Mutation, Arg, Int, Query } from 'type-graphql';
import { CharacterService } from "../../../service/characterService";
import { RickAndMortyRequest } from "../../requests/getCharactersFromApi";
import CharacterRepository from "../../respository/characterRepository";
import { Characters } from "../../../entity/characters";
import { LogExecutionTime } from "../../../configs/decorators/logExecutionTime";
import {getCachedData, setCachedData} from "../../../service/cacheService";

@Resolver(() => Characters)
export class CharacterResolver {
    private characterService: CharacterService;

    constructor() {
        const rickAndMortyRequest = new RickAndMortyRequest();
        const characterRepository = new CharacterRepository();
        this.characterService = new CharacterService(characterRepository, rickAndMortyRequest);
    }

    @LogExecutionTime()
    @Mutation(() => [Characters])
    async importCharacters(@Arg('count', () => Int) count: number): Promise<Characters[]> {
        try {
            return await this.characterService.importCharacters(count);
        } catch (error) {
            console.error('Error importing characters:', error);
            throw new Error('Failed to import characters. Please try again later.');
        }
    }

    @LogExecutionTime()
    @Query(() => [Characters])
    async getCharacters(
        @Arg('status', () => String, { nullable: true }) status?: string,
        @Arg('species', () => String, { nullable: true }) species?: string,
        @Arg('gender', () => String, { nullable: true }) gender?: string,
        @Arg('name', () => String, { nullable: true }) name?: string,
        @Arg('origin', () => String, { nullable: true }) origin?: string
    ): Promise<Characters[]> {
        try {
            const cacheKey = `characters_${status || 'all'}_${species || 'all'}_${gender || 'all'}_${name || 'all'}_${origin || 'all'}`;
            const cachedData = await getCachedData(cacheKey);

            if (cachedData) {
                return JSON.parse(cachedData);
            }

            const characters = await this.characterService.getCharacters({ status, species, gender, name, origin });
            await setCachedData(cacheKey, JSON.stringify(characters), 3600);

            return characters;
        } catch (error) {
            console.error('Error fetching characters:', error);
            throw new Error('Failed to fetch characters. Please try again later.');
        }
    }
}