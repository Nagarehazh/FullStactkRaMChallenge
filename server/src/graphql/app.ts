import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema} from 'type-graphql';
import {Application} from "express-serve-static-core";
import HealthCheckResolver from "./resolvers/healthCheckResolver";

export async function startApolloServer() {
    const app = express();

    const schema = await buildSchema({
        resolvers: [HealthCheckResolver],
    });

    const server = new ApolloServer({ schema });
    await server.start();

    server.applyMiddleware({
        app: app as unknown as Application<Record<string, any>>,
        path: '/graphql'
    });

    return app
}
