import { SocialProfiles } from "entities/social_profiles"
import { InputType, Field } from "type-graphql"

@InputType()
export class CreateSocialProfiles {
    @Field()
    status: string

    @Field()
    message: string
}

@InputType()
export class GetSocialProfiles {
    @Field()
    status: string

    @Field()
    message: string

    @Field()
    socialProfiles: SocialProfiles[]
}