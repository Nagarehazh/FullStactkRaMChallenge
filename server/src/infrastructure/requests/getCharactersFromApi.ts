import axios from 'axios';
import {Characters} from "../../entity/characters";


export class RickAndMortyRequest {
    private apiUrl = 'https://rickandmortyapi.com/api';

    async getCharacters(page: number = 1): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}/character?page=${page}`);
            return response.data.results;
        } catch (error) {
            console.error('Error fetching characters from Rick and Morty API:', error);
            throw error;
        }
    }

    mapApiCharacterToEntity(apiCharacter: any): Partial<Characters> {
        return {
            name: apiCharacter.name,
            status: apiCharacter.status,
            species: apiCharacter.species,
            type: apiCharacter.type,
            gender: apiCharacter.gender,
            origin: apiCharacter.origin.name,
            location: apiCharacter.location.name,
            image: apiCharacter.image,
        };
    }
}