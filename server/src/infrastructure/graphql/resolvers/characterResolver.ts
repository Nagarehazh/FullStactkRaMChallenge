import {Resolver, Mutation, Arg, Int, Query} from 'type-graphql';
import { CharacterService } from "../../../service/characterService";
import { RickAndMortyRequest } from "../../requests/getCharactersFromApi";
import CharacterRepository from "../../respository/characterRepository";
import { Characters } from "../../../entity/characters";

@Resolver(() => Characters)
export class CharacterResolver {
    private characterService: CharacterService;

    constructor() {
        const rickAndMortyRequest = new RickAndMortyRequest();
        const characterRepository = new CharacterRepository();
        this.characterService = new CharacterService(characterRepository, rickAndMortyRequest);
    }

    @Mutation(() => [Characters])
    async importCharacters(@Arg('count', () => Int) count: number): Promise<Characters[]> {
        try {
            return await this.characterService.importCharacters(count);
        } catch (error) {
            console.error('Error importing characters:', error);
            throw new Error('Failed to import characters. Please try again later.');
        }
    }
}
