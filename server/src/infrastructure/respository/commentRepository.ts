import { Repository } from 'typeorm';
import { Comments } from '../../entity/comments';
import { AppDataSource } from '../../configs/postgres/datasource';

export class CommentRepository {
    private repository: Repository<Comments>;

    constructor() {
        this.repository = AppDataSource.getRepository(Comments);
    }

    createComment(characterId: string, content: string): Comments {
        return this.repository.create({ characterId, content });
    }

    async save(comment: Comments): Promise<Comments> {
        return await this.repository.save(comment);
    }
}