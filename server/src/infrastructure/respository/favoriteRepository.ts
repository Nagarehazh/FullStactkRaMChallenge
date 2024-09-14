import { Repository } from 'typeorm';
import { Favorites } from '../../entity/favorites';
import { AppDataSource } from '../../configs/postgres/datasource';

export class FavoriteRepository {
    private repository: Repository<Favorites>;

    constructor() {
        this.repository = AppDataSource.getRepository(Favorites);
    }

    async findByCharacterId(characterId: string): Promise<Favorites | null> {
        return this.repository.findOne({ where: { characterId } });
    }

    async create(characterId: string): Promise<Favorites> {
        const favorite = this.repository.create({ characterId });
        return this.repository.save(favorite);
    }

    async remove(favorite: Favorites): Promise<void> {
        await this.repository.remove(favorite);
    }

    async getAllFavorites(): Promise<Favorites[]> {
        return this.repository.find({ relations: ['character'] });
    }
}