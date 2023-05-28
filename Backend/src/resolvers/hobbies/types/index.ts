import { Hobbies } from "entities/hobbies"
import { InputType, Field } from "type-graphql"

@InputType()
export class CreateHobbies {
    @Field()
    status: string

    @Field()
    message: string
}

@InputType()
export class GetHobbies {
    @Field()
    status: string

    @Field()
    message: string

    @Field()
    hobbies: Hobbies[]
}