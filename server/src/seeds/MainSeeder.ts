import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import CharacterRepository from "../infrastructure/respository/characterRepository";
import { RickAndMortyRequest } from "../infrastructure/requests/getCharactersFromApi";
import { CharacterService } from "../service/characterService";

export class MainSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const characterRepository = new CharacterRepository();
        const rickAndMortyRequest = new RickAndMortyRequest();
        const characterService = new CharacterService(characterRepository, rickAndMortyRequest);

        const existingCharacters = await characterRepository.getCharacterCount();
        if (existingCharacters > 0) {
            console.log('✅ Characters already exist in the database. Characters Seed not necessary.');
            return;
        }

        await characterService.importCharacters(15);
        console.log('✅ Seeded 15 characters successfully');
    }
}