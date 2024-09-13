import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import type { Relation } from 'typeorm';
import {Characters} from "./characters";

@Entity('favorites')
export class Favorites {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    characterId!: string;

    @ManyToOne(() => Characters, character => character.favorites, { onDelete: 'CASCADE' })
    character!: Relation<Characters>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}