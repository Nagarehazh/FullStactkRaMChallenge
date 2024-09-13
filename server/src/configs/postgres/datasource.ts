import {DataSource, DataSourceOptions} from "typeorm";
import {environments} from "../../utils/environments"

const options: DataSourceOptions = {
    type: "postgres",
    url: environments.DATABASE_URL,
    port: environments.DB_PORT,
    entities: [],
    migrations: ['migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_tables',
    synchronize: false,
    logging: false,
    //seeds: [MainSeeder],
    extra: {
        max: 5,
    }
};

export const AppDataSource = new DataSource(options);