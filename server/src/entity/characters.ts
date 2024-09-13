import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm';
import type { Relation } from 'typeorm';
import {Favorites} from "./favorites";
import {Comments} from "./comments";

@Entity('characters')
export class Characters {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name!: string;

    @Column()
    status!: string;

    @Column()
    species!: string;

    @Column()
    type!: string;

    @Column()
    gender!: string;

    @Column()
    origin!: string;

    @Column()
    location!: string;

    @Column()
    image!: string;

    @OneToMany(() => Comments, comment => comment.character)
    comments!: Relation<Comment[]>;

    @OneToMany(() => Favorites, favorite => favorite.character)
    favorites!: Relation<Favorites[]>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}