import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Application } from "express-serve-static-core";
import HealthCheckResolver from "./resolvers/healthCheckResolver";
import { CharacterResolver } from "./resolvers/characterResolver";
import { FavoriteResolver } from "./resolvers/favoriteResolver";
import { Characters } from "../../entity/characters";
import { Favorites } from "../../entity/favorites";
import { requestLogger } from "../middleware/requestLogger";

const app = express();
app.use(requestLogger);

export async function startApolloServer() {
    const schema = await buildSchema({
        resolvers: [HealthCheckResolver, CharacterResolver, FavoriteResolver],
        orphanedTypes: [Characters, Favorites],
        emitSchemaFile: true,
        validate: false,
    });

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
    });

    await server.start();

    server.applyMiddleware({
        app: app as unknown as Application<Record<string, any>>,
        path: '/graphql',
    });

    return app;
}