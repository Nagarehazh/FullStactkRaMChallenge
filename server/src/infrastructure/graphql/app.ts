import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Application } from "express-serve-static-core";
import HealthCheckResolver from "./resolvers/healthCheckResolver";
import { CharacterResolver } from "./resolvers/characterResolver";
import { Characters } from "../../entity/characters";
import {loggerPlugin} from "../middleware/loggerPlugin";

export async function startApolloServer() {
    const app = express();

    const schema = await buildSchema({
        resolvers: [HealthCheckResolver, CharacterResolver],
        orphanedTypes: [Characters],
        emitSchemaFile: true,
        validate: false,
    });

    const server = new ApolloServer({
        schema,
        context: ({ req, res }) => ({ req, res }),
        plugins: [loggerPlugin],
        introspection: process.env.NODE_ENV !== 'production'
    });

    await server.start();

    server.applyMiddleware({
        app: app as unknown as Application<Record<string, any>>,
        path: '/graphql',
    });

    return app;
}