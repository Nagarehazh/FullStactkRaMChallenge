import 'reflect-metadata';
import {startApolloServer} from './infrastructure/graphql/app';
import {Application} from "express";
import {environments} from "./configs/environments";
import {AppDataSource} from "./configs/postgres/datasource"

(function main() {
        startApolloServer().then((app: Application) => {
                app.listen({port: environments.PORT}, () => {
                    console.log(`🚀 Server ready at http://localhost:${environments.PORT}/graphql`);
                });
            }
        )

        AppDataSource.initialize()
            .then(() => {
                console.log('🎲 Database connected')
            })
            .catch((error) => {
                console.log('Database connection error', error)
            });
    }
)();

