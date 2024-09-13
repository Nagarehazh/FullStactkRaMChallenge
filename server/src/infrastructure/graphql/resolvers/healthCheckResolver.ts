import {Field, ObjectType, Query, Resolver} from "type-graphql";

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

export default HealthCheckResolver;