import { Favorites } from "../entity/favorites";
import {FavoriteRepository} from "../infrastructure/respository/favoriteRepository";

export class FavoriteService {
    constructor(
        private favoriteRepository: FavoriteRepository
    ) {}

    async toggleFavorite(characterId: string): Promise<{ favorite: Favorites | null }> {
        const existingFavorite = await this.favoriteRepository.findByCharacterId(characterId);

        if (existingFavorite) {
            await this.favoriteRepository.remove(existingFavorite);
            console.log(`🗑️ Removed favorite for character: ${characterId}`);
            return { favorite: null };
        } else {
            const newFavorite = await this.favoriteRepository.create(characterId);
            console.log(`✨ Added new favorite for character: ${characterId}`);
            return { favorite: newFavorite };
        }
    }

    async getFavoriteCharacters(): Promise<Favorites[]> {
        return await this.favoriteRepository.getAllFavorites();
    }
}