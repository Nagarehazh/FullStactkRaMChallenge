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
        let insertedCount = 0;
        let updatedCount = 0;

        while (importedCharacters.length < count) {
            try {
                const apiCharacters = await this.rickAndMortyRequest.getCharacters(page);
                if (apiCharacters.length === 0) break;

                for (const apiCharacter of apiCharacters) {
                    if (importedCharacters.length >= count) break;

                    const characterData = this.rickAndMortyRequest.mapApiCharacterToEntity(apiCharacter);
                    const { character, isNew } = await this.characterRepository.createOrUpdateCharacter(characterData);

                    if (isNew) {
                        insertedCount++;
                        console.log(`✅ Inserted character: ${character.name}`);
                    } else {
                        updatedCount++;
                        console.log(`🔄 Updated character: ${character.name}`);
                    }

                    importedCharacters.push(character);
                }

                page++;
            } catch (error) {
                console.error(`❌ Error fetching characters from page ${page}:`, error);
                break;
            }
        }

        console.log(`\n📊 Import Summary:`);
        console.log(`Total characters imported: ${importedCharacters.length}`);
        console.log(`Characters inserted: ${insertedCount}`);
        console.log(`Characters updated: ${updatedCount}\n`);

        return importedCharacters;
    }
}