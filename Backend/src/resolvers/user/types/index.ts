import { User } from "entities/user"
import { InputType, Field, ObjectType } from "type-graphql"

@InputType()
export class UserRegister {
    @Field()
    username: string
    @Field()
    password: string

    @Field()
    name: string

    @Field()
    age: number

    @Field()
    gender: string
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