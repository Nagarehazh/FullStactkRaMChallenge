import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Characters1726244281323 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "characters",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "status",
                    type: "varchar",
                },
                {
                    name: "species",
                    type: "varchar",
                },
                {
                    name: "type",
                    type: "varchar",
                },
                {
                    name: "gender",
                    type: "varchar",
                },
                {
                    name: "origin",
                    type: "varchar",
                },
                {
                    name: "location",
                    type: "varchar",
                },
                {
                    name: "image",
                    type: "varchar",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "deleted_at",
                    type: "timestamp",
                    isNullable: true
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("characters");
    }

}
