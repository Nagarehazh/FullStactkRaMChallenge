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
@Entity('favorites')
export class Favorites {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column('uuid')
    characterId!: string;

    @Field(() => Characters)
    @ManyToOne(() => Characters, character => character.favorites, { onDelete: 'CASCADE' })
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
