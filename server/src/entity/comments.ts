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

@Entity('comments')
export class Comments {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('uuid')
    characterId!: string;

    @Column('text')
    content!: string;

    @ManyToOne(() => Characters, character => character.comments, { onDelete: 'CASCADE' })
    character!: Relation<Characters>;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @DeleteDateColumn()
    deletedAt!: Date;
}