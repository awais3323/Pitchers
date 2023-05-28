import argon2 from "argon2";
import { User } from "entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { sendToken } from "utils/jwt";
import { MyContext } from "types";
import { LoginUser, UserRegister, UserResponse } from "./types";
import { isAuthenticatedUser } from "middleware/auth";
import { Languages } from "entities/langauges";
import { UserLanguages } from "entities/user/user_languages";
import { Hobbies } from "entities/hobbies";
import { UserHobbies } from "entities/user/user_hobbies";
import { SocialProfiles } from "entities/social_profiles";
import { UserSocialProfiles } from "entities/user/user_social_profiles";

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async registerUser(
    @Arg("options") options: UserRegister,
    @Ctx() { res }: MyContext
  ): Promise<UserResponse> {
    try {
      // Validate username and password length
      if (options.username.length <= 3) {
        return {
          errors: [
            {
              field: "username",
              message: "Username must be at least 4 characters long",
            },
          ],
        };
      }

      if (options.password.length <= 4) {
        return {
          errors: [
            {
              field: "password",
              message: "Password must be at least 5 characters long",
            },
          ],
        };
      }

      // Check if user with the same username exists
      const existingUser = await User.findOne({ where: { username: options.username } });
      if (existingUser) {
        return {
          errors: [
            {
              field: "username",
              message: "Username already exists",
            },
          ],
        };
      }

      // Hash the password
      const hashedPassword = await argon2.hash(options.password);

      // Create the user entity
      let userId = Math.floor(Math.random() * 900000) + 100000;
      const user = User.create({
        _id: userId,
        username: options.username,
        password: hashedPassword,
        name: options.name,
        age: options.age,
        gender: options.gender,
        title: options.title,
        intro: options.intro,
        email: options.email,
        phone_no: options.phone_no,
        profile_urls: options.profile_urls,
        date_of_birth: options.date_of_birth,
      });

      // Save the user to the database
      await user.save();

      // Create and save user languages

      const languages = await Languages.findByIds(options.languages);
      const userLanguages = languages.map((language) => {
        const userLanguage = UserLanguages.create({
          _id: Math.floor(Math.random() * 900000) + 100000,
          user_id: user._id,
          languages_id: language._id,
        });
        return userLanguage.save();
      });

      // Wait for all user languages to be saved before continuing
      await Promise.all(userLanguages);

      const hobbies = await Hobbies.findByIds(options.hobbies);
      const userHobbies = hobbies.map((hobby) => {
        const userHobbies = UserHobbies.create({
          _id: Math.floor(Math.random() * 900000) + 100000,
          user_id: user._id,
          hobbies_id: hobby._id,
        });
        return userHobbies.save();
      });

      // Wait for all user hobbies to be saved before continuing
      await Promise.all(userHobbies);

      const socialProfiles = await SocialProfiles.findByIds(options.social_profiles.social_profiles);
      const socialProfileUsers = socialProfiles.map((SP, i) => {
        const socialProfileUser = UserSocialProfiles.create({
          _id: Math.floor(Math.random() * 900000) + 100000,
          user_id: user._id,
          social_profile_id: SP._id,
          url: options.social_profiles.url[i],
        });
        return socialProfileUser.save();
      });

      // Wait for all user social profiles to be saved before continuing
      await Promise.all(socialProfileUsers);

      // Send the access token
      sendToken(res, user, 200);

      // Return the user response
      return { user };
    } catch (error) {
      console.error(error);
      return {
        errors: [
          {
            field: "unknown",
            message: "An error occurred while registering the user",
          },
        ],
      };
    }
  }

  @Mutation(() => UserResponse)
  async loginUser(
    @Arg("options") options: LoginUser,
    @Ctx() { res }: MyContext): Promise<UserResponse> {
    const { username } = options
    let user = await User.findOne({ where: { username } })
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const verifyUser = await argon2.verify(user.password, options.password)
    if (!verifyUser) { // if the password doesn't matches
      return {
        errors: [{
          field: "Unknown",
          message: "Unable to login with provided credentials"
        }],
      }
    }
    sendToken(res, user, 200)
    return { user };
  }
  @Query(() => User, { nullable: true })
  async me(
    @Ctx() { req }: MyContext
  ) {
    await isAuthenticatedUser(req)
    if (!req.user) {
      return null
    }
    const { _id } = req.user;
    const user = User.findOne({ where: { _id } })
    return user;
  }

}