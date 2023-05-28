import { Mutation, Query, Resolver } from "type-graphql";
import { hobbies } from "./Seed";
import { CreateHobbies, GetHobbies } from "./types";
import { Hobbies } from "entities/hobbies";

@Resolver()
export class HobbiesResolver {
    @Mutation(() => String)
    async createHobbies(): Promise<CreateHobbies> {
        try {
            let hobby;
            hobbies.forEach((ele) => {
                hobby = Hobbies.create({
                    _id: Math.floor(Math.random() * 900000) + 100000,
                    name: ele,
                })
                hobby?.save()
            })
            return { status: "success", message: `All the hobbies have been addeda Successfully.` }
        }
        catch (error) {
            throw new Error("Unable to add the hobbies in the database" + error);
        }
    }
    @Query(() => String)
    async getHobbies(): Promise<GetHobbies> {
        try {
            let hobbies = await Hobbies.find();
            return { status: "success", message: `All the users are fetched`, hobbies :hobbies}
        }
        catch (error) {
            throw new Error("Unable to add the hobbies in the database" + error);
        }
    }
}