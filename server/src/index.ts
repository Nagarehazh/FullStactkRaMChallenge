import 'reflect-metadata';
import {startApolloServer} from './infrastructure/graphql/app';
import {Application} from "express";
import {environments} from "./configs/environments";
import {AppDataSource} from "./configs/postgres/datasource"
import {MainSeeder} from "./seeds/MainSeeder";
import {connectRedis} from "./configs/redis/redisClient";

(async function main() {
        await connectRedis();

        startApolloServer().then((app: Application) => {
               app.listen({port: environments.PORT}, () => {
                    console.log(`🚀 Server ready at http://localhost:${environments.PORT}/graphql`);
                });
            }
        )

        AppDataSource.initialize()
            .then(async () => {
                console.log('🎲 Database connected');
                const seeder = new MainSeeder();
                await seeder.run(AppDataSource);
            })
            .catch((error) => {
                console.error('Database connection error', error);
                process.exit(1);
            });
    }
)();

