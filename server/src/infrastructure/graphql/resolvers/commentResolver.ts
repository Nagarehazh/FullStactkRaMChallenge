import { Resolver, Mutation, Arg, ObjectType, Field } from 'type-graphql';
import { CommentService } from '../../../service/commentService';
import { Comments } from '../../../entity/comments';
import { CommentRepository } from "../../respository/commentRepository";

@ObjectType()
class CommentResponse {
    @Field()
    success?: boolean;

    @Field({ nullable: true })
    message?: string;

    @Field(() => Comments, { nullable: true })
    comment?: Comments;
}

@Resolver(() => Comments)
export class CommentResolver {
    private commentService: CommentService;

    constructor() {
        const commentRepository = new CommentRepository();
        this.commentService = new CommentService(commentRepository);
    }

    @Mutation(() => CommentResponse)
    async addComment(
        @Arg('characterId') characterId: string,
        @Arg('content') content: string
    ): Promise<CommentResponse> {
        try {
            const comment = await this.commentService.addComment(characterId, content);
            return { success: true, comment };
        } catch (error) {
            console.error('Error adding comment:', error);
            return { success: false, message: 'Failed to add comment' };
        }
    }
}