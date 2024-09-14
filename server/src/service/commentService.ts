import { Comments } from '../entity/comments';
import { removeCachedData } from './cacheService';
import { CommentRepository } from "../infrastructure/respository/commentRepository";
import CharacterRepository from "../infrastructure/respository/characterRepository";

export class CommentService {
    private characterRepository: CharacterRepository;

    constructor(private commentRepository: CommentRepository) {
        this.characterRepository = new CharacterRepository();
    }

    async addComment(characterId: string, content: string): Promise<Comments> {
        const character = await this.characterRepository.findCharacterById(characterId);
        if (!character) {
            throw new Error('Character not found');
        }

        const comment = this.commentRepository.createComment(characterId, content);
        const savedComment = await this.commentRepository.save(comment);

        await removeCachedData('characters_*');

        return savedComment;
    }
}