import { MigrationInterface, QueryRunner } from "typeorm";

export class Comments1726244386039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE "comments" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "character_id" uuid NOT NULL,
                "content" text NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_comments_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_character_id" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "comments"`);
    }
}
