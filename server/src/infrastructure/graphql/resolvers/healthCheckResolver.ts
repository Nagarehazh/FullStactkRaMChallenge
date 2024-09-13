import {Field, ObjectType, Query, Resolver} from "type-graphql";
import {LogExecutionTime} from "../../../configs/decorators/logExecutionTime";

@ObjectType()
class HealthCheckResponse {
    @Field()
    status!: string;
}

@Resolver()
class HealthCheckResolver {

    @LogExecutionTime()
    @Query(() => HealthCheckResponse)
    async healthCheck(): Promise<HealthCheckResponse> {
        return {
            status: 'OK',
        };
    }
}

export default HealthCheckResolver;