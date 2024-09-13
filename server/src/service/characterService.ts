import { RickAndMortyRequest } from "../infrastructure/requests/getCharactersFromApi";
import CharacterRepository from "../infrastructure/respository/characterRepository";
import { Characters } from "../entity/characters";

export class CharacterService {
    constructor(
        private characterRepository: CharacterRepository,
        private rickAndMortyRequest: RickAndMortyRequest
    ) {}

    async importCharacters(count: number): Promise<Characters[]> {
        const importedCharacters: Characters[] = [];
        let page = 1;

        while (importedCharacters.length < count) {
            try {
                const apiCharacters = await this.rickAndMortyRequest.getCharacters(page);
                if (apiCharacters.length === 0) break;

                for (const apiCharacter of apiCharacters) {
                    if (importedCharacters.length >= count) break;

                    const characterData = this.rickAndMortyRequest.mapApiCharacterToEntity(apiCharacter);
                    const character = await this.characterRepository.findOrCreateCharacter(characterData);
                    importedCharacters.push(character);
                }

                page++;
            } catch (error) {
                console.error(`Error fetching characters from page ${page}:`, error);
                break; // Stop trying if there's an error
            }
        }

        return importedCharacters;
    }
}