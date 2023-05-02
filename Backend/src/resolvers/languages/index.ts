import { Languages } from "entities/langauges";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { MyContext } from "types";

@Resolver()
export class LanguageResolver{
    @Query(() => String)
    async createLanguages(
        @Arg("name") name: string,
        @Ctx() {}: MyContext) {
        try {
            let langauge = Languages.create({
                _id: Math.floor(Math.random() * 900000) + 100000,
                name: name
            })
            langauge.save()
        }
        catch (err) {
            console.log(err)
        }
    }
}