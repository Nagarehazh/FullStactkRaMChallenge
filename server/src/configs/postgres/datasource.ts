import {DataSource, DataSourceOptions} from "typeorm";
import {environments} from "../environments"
import {Characters} from "../../entity/characters";
import {Comments} from "../../entity/comments";
import {Favorites} from "../../entity/favorites";

const options: DataSourceOptions = {
    type: "postgres",
    url: environments.DATABASE_URL,
    port: environments.DB_PORT,
    entities: [Characters, Comments, Favorites],
    migrations: ['src/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_tables',
    synchronize: false,
    logging: false,
    //seeds: [MainSeeder],
    extra: {
        max: 5,
    }
};

export const AppDataSource = new DataSource(options);