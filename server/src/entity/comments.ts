import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Characters } from './characters';

@ObjectType()
@Entity('comments')
export class Comments {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column('uuid')
    characterId!: string;

    @Field()
    @Column('text')
    content!: string;

    @Field(() => Characters)
    @ManyToOne(() => Characters, character => character.comments, { onDelete: 'CASCADE' })
    character!: Characters;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @Field({ nullable: true })
    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;
}
