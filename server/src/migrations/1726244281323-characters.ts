import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCharactersTable1726244281323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE "characters" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" varchar NOT NULL,
                "status" varchar NOT NULL,
                "species" varchar NOT NULL,
                "type" varchar NOT NULL,
                "gender" varchar NOT NULL,
                "origin" varchar NOT NULL,
                "location" varchar NOT NULL,
                "image" varchar NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_characters_id" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "characters"`);
    }
}
