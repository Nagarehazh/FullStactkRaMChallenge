import { MigrationInterface, QueryRunner } from "typeorm";

export class Favorites1726244396036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "character_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_favorites_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_character_id_favorites" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "favorites"`);
    }
}
