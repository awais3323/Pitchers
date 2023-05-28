import { Mutation, Query, Resolver } from "type-graphql";
import { socialMediaNames } from "./Seed";
import { CreateSocialProfiles, GetSocialProfiles } from "./types";
import { SocialProfiles } from "entities/social_profiles";

@Resolver()
export class SocialProfileResolver{
    @Mutation(() => String)
    async createSocialProfiles(): Promise<CreateSocialProfiles> {
        try {
            let socialProfile;
            socialMediaNames.forEach((ele) => {
                socialProfile = SocialProfiles.create({
                    _id: Math.floor(Math.random() * 900000) + 100000,
                    name: ele,
                })
                socialProfile?.save()
            })
            return { status: "success", message: `All the social profiles have been addeda Successfully.` }
        }
        catch (error) {
            throw new Error("Unable to add the social profiles in the database" + error);
        }
    }
    @Query(() => String)
    async getSocialProfiles(): Promise<GetSocialProfiles> {
        try {
            let socialProfile = await SocialProfiles.find();
            return { status: "success", message: `All the social profiles are fetched`, socialProfiles: socialProfile }
        }
        catch (error) {
            throw new Error("Unable to add the social profiles in the database" + error);
        }
    }
}