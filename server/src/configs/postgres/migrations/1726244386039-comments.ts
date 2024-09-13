import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class Comments1726244386039 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "character_id",
                    type: "uuid",
                },
                {
                    name: "content",
                    type: "text",
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

        await queryRunner.createForeignKey("comments", new TableForeignKey({
            columnNames: ["character_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "characters",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("comments");
        if (!table) return;
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("character_id") !== -1);
        if (!foreignKey) return;
        await queryRunner.dropForeignKey("comments", foreignKey);
        await queryRunner.dropTable("comments");
    }

}
