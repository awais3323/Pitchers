import { User } from "entities/user"
import { InputType, Field, ObjectType } from "type-graphql"


@InputType()
class profileInput {

    @Field(() => [Number])
    social_profiles: number[]

    @Field(() => [String])
    url: string[]
}

@InputType()
export class UserRegister {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    name: string

    @Field()
    title: string

    @Field()
    intro: string

    @Field()
    email: string

    @Field()
    phone_no: number

    @Field()
    profile_urls: string

    @Field()
    date_of_birth: string

    @Field()
    age: number

    @Field()
    gender: string

    @Field(() => [Number])
    languages: number[]

    @Field(() => [Number])
    hobbies: number[]

    @Field()
    social_profiles:profileInput 
}

@InputType()
export class LoginUser {
    @Field()
    username: string

    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string
    @Field()
    message: string
}

@ObjectType()
export class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field(() => User, { nullable: true })
    user?: User
}