import { Resolver, Mutation, Arg, Query, ObjectType, Field } from 'type-graphql';
import { FavoriteService } from "../../../service/favoriteService";

import { Favorites } from "../../../entity/favorites";
import { Characters } from "../../../entity/characters";
import { removeCachedData } from "../../../service/cacheService";
import {FavoriteRepository} from "../../respository/favoriteRepository";

@ObjectType()
class ToggleFavoriteResponse {
    @Field()
    success?: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(() => Favorites, { nullable: true })
    favorite?: Favorites;
}

@Resolver(() => Favorites)
export class FavoriteResolver {
    private favoriteService: FavoriteService;

    constructor() {
        const favoriteRepository = new FavoriteRepository();
        this.favoriteService = new FavoriteService(favoriteRepository);
    }

    @Mutation(() => ToggleFavoriteResponse)
    async toggleFavorite(@Arg('characterId') characterId: string): Promise<ToggleFavoriteResponse> {
        try {
            const result = await this.favoriteService.toggleFavorite(characterId);

            await removeCachedData('characters_*');

            if (result.favorite) {
                return { success: true, message: 'Favorito agregado', favorite: result.favorite };
            } else {
                return { success: true, message: 'Favorito eliminado' };
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
            return { success: false, message: 'Error al cambiar el estado del favorito' };
        }
    }

    @Query(() => [Characters])
    async getFavoriteCharacters(): Promise<Favorites[]> {
        return this.favoriteService.getFavoriteCharacters();
    }
}