import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import { GraphQLRequestContext } from 'apollo-server-types';

export const loggerPlugin: ApolloServerPlugin = {
    async requestDidStart(requestContext: GraphQLRequestContext): Promise<GraphQLRequestListener> {
        const startTime = Date.now();
        const { operationName } = requestContext.request;

        if (operationName === 'IntrospectionQuery') {
            return {};
        }

        return {
            async willSendResponse() {
                const duration = Date.now() - startTime;
                const resolvedOperationName = operationName || 'Unnamed';

                console.log(
                    `[GraphQL Request] Operation: ${resolvedOperationName} took ${duration} ms`
                );
            }
        };
    }
};
