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
class profileInputUpdate {

    @Field()
    social_profiles: number

    @Field()
    url: string
}

@InputType()
export class EducationsUser {
    @Field()
    title: string

    @Field()
    description: string

    @Field()
    institute_name: string

    @Field()
    date_joined: string

    @Field()
    date_left: string
}

@InputType()
export class ExperiencesUser {
    @Field()
    title: string

    @Field()
    description: string

    @Field()
    company_name: string

    @Field()
    date_joined: string

    @Field()
    date_left: string
}


@InputType()
export class UserRegister {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    github_token: string

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
    social_profiles: profileInput

    @Field(() => [EducationsUser])
    educations: EducationsUser[]

    @Field(() => [ExperiencesUser])
    experiences: ExperiencesUser[]
}

@InputType()
export class deleteItem {
    @Field()
    username: string

    @Field()
    id: number;
}

@InputType()
export class deleteUser {
    @Field()
    username: string
}


@InputType()
export class experienceAdd {
    @Field()
    username: string

    @Field(() => [ExperiencesUser])
    experiences: ExperiencesUser[]
}

@InputType()
export class educationAdd {
    @Field()
    username: string

    @Field(() => [EducationsUser])
    educations: EducationsUser[]
}

@InputType()
export class educationUpdate {
    @Field()
    username: string

    @Field()
    id:number

    @Field()
    educations: EducationsUser
}

@InputType()
export class experienceUpdate{
    @Field()
    username: string

    @Field()
    id:number

    @Field()
    experience :ExperiencesUser
}


@InputType()
export class languageAdd {
    @Field()
    username: string

    @Field(() => [Number])
    languages: number[]
}

@InputType()
export class hobbiesAdd {
    @Field()
    username: string

    @Field(() => [Number])
    hobbies: number[]
}

@InputType()
export class profilesAdd {
    @Field()
    username: string

    @Field()
    profiles: profileInput
}

@InputType()
export class profilesUpdate {
    @Field()
    username: string

    @Field()
    id: number
    
    @Field()
    profiles: profileInputUpdate
}

@InputType()
export class UserUpdate {
    @Field()
    username: string

    @Field()
    name: string

    @Field()
    title: string

    @Field()
    intro: string

    @Field()
    email: string

    @Field()
    gender: string

    @Field()
    phone_no: number

    @Field()
    date_of_birth: string

    @Field()
    age: number

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

    @Field()
    status:boolean
}

@ObjectType()
export class UpdateResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[]

    @Field()
    message?: string
    
}