import { Resolver } from "type-graphql";
import { Query } from "type-graphql/dist/decorators";
@Resolver()
export class HelloResolver {
    @Query(() => String)
    hello() {
        return 'Hello from Pitchers'
    }
}