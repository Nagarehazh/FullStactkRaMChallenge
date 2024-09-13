import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';
import { Comments } from './comments';
import { Favorites } from './favorites';

@ObjectType()
@Entity('characters')
export class Characters {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column()
    status!: string;

    @Field()
    @Column()
    species!: string;

    @Field()
    @Column()
    type!: string;

    @Field()
    @Column()
    gender!: string;

    @Field()
    @Column()
    origin!: string;

    @Field()
    @Column()
    location!: string;

    @Field()
    @Column()
    image!: string;

    @Field(() => [Comments])
    @OneToMany(() => Comments, comment => comment.character)
    comments!: Comments[];

    @Field(() => [Favorites])
    @OneToMany(() => Favorites, favorite => favorite.character)
    favorites!: Favorites[];

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
