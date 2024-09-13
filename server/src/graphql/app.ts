import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema, Resolver, Query, ObjectType, Field } from 'type-graphql';
import {Application} from "express-serve-static-core";

@ObjectType()
class HealthCheckResponse {
    @Field()
    status!: string;
}

@Resolver()
class HealthCheckResolver {
    @Query(() => HealthCheckResponse)
    async healthCheck(): Promise<HealthCheckResponse> {
        return {
            status: 'OK',
        };
    }
}

export async function startApolloServer() {
    const app = express();

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'OK', timestamp: new Date() });
    });

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
