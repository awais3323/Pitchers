import argon2 from "argon2";
import { User } from "entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext } from "types";
import { isAuthenticatedUser } from "middleware/auth";
import { Languages } from "entities/langauges";
import { UserLanguages } from "entities/user/user_languages";
import { Hobbies } from "entities/hobbies";
import { UserHobbies } from "entities/user/user_hobbies";
import { SocialProfiles } from "entities/social_profiles";
import { UserSocialProfiles } from "entities/user/user_social_profiles";
import { UserEducations } from "entities/user/user_education";
import { UserExperiences } from "entities/user/user_experiences";
import { In } from "typeorm";
import { LoginUser, UpdateResponse, UserRegister, UserResponse, UserUpdate, deleteItem, deleteUser, educationAdd, educationUpdate, experienceAdd, experienceUpdate, hobbiesAdd, languageAdd, profilesAdd, profilesUpdate } from "./types";
import {sendToken} from "utils/jwt"

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
          status: false,
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
          status: false,
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
          status: false,
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

      const hashedToken = options.github_token.length > 0 ? await argon2.hash(options.github_token) : "";

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
        git_token: hashedToken,
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

      const userEd = options.educations.map((UE) => {
        const educationsUser = UserEducations.create({
          _id: Math.floor(Math.random() * 900000) + 100000,
          user_id: user._id,
          title: UE.title,
          description: UE.description,
          institute_name: UE.institute_name,
          date_joined: UE.date_joined,
          date_left: UE.date_left
        })
        return educationsUser.save();
      })
      await Promise.all(userEd);

      const userEx = options.experiences.map((UEX) => {
        const experiencesUser = UserExperiences.create({
          _id: Math.floor(Math.random() * 900000) + 100000,
          user_id: user._id,
          title: UEX.title,
          description: UEX.description,
          company_name: UEX.company_name,
          date_joined: UEX.date_joined,
          date_left: UEX.date_left
        })
        return experiencesUser.save();
      })
      await Promise.all(userEx);

      // Send the access token
      sendToken(res, user, 201);

      // Return the user response
      return { status: true, user };
    } catch (error) {
      console.error(error);
      return {
        status: false,
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
        status: false,
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const verifyUser = await argon2.verify(user.password, options.password)
    if (!verifyUser) { // if the password doesn't matches
      return {
        status: false,
        errors: [{
          field: "Unknown",
          message: "Unable to login with provided credentials"
        }],
      }
    }
    sendToken(res, user, 201)
    return { status: true, user };
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

  @Mutation(() => UserResponse)
  async userUpdate(
    @Arg("options") options: UserUpdate,
    @Ctx() { res }: MyContext): Promise<UserResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        status: false,
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    user.name = options.name,
      user.age = options.age,
      user.gender = options.gender,
      user.title = options.title,
      user.intro = options.intro,
      user.email = options.email,
      user.phone_no = options.phone_no,
      user.date_of_birth = options.date_of_birth,

      // Save the user to the database
      await user.save();
    sendToken(res, user, 201)
    return { status: false, user };
  }


  @Mutation(() => UpdateResponse)
  async profileUpdate(
    @Arg("options") options: profilesUpdate): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }

    let profile = await UserSocialProfiles.findOne({ where: { user_id: user._id, _id: options.id } });
    if (!profile) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "profile not found"
        }],
      }
    }
    profile.social_profile_id = options.profiles.social_profiles
    profile.url = options.profiles.url
    await profile.save();
    return { message: "Profile Update" };
  }

  @Mutation(() => UpdateResponse)
  async educationUpdate(
    @Arg("options") options: educationUpdate): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }

    let education = await UserEducations.findOne({ where: { user_id: user._id, _id: options.id } });
    if (!education) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "record not found"
        }],
      }
    }
    education.title = options.educations.title,
      education.description = options.educations.description,
      education.institute_name = options.educations.institute_name
    education.date_joined = options.educations.date_joined,
      education.date_left = options.educations.date_left
    await education.save();
    return { message: "record Update" };
  }

  @Mutation(() => UpdateResponse)
  async experienceUpdate(
    @Arg("options") options: experienceUpdate): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }

    let experience = await UserExperiences.findOne({ where: { user_id: user._id, _id: options.id } });
    if (!experience) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "record not found"
        }],
      }
    }
    experience.title = options.experience.title,
      experience.description = options.experience.description,
      experience.company_name = options.experience.company_name
    experience.date_joined = options.experience.date_joined,
      experience.date_left = options.experience.date_left
    await experience.save();
    return { message: "record Update" };
  }

  @Mutation(() => UpdateResponse)
  async languagesAdd(
    @Arg("options") options: languageAdd,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const existingLanguages = await UserLanguages.find({ where: { user_id: user._id, languages_id: In(options.languages) } });
    console.log(existingLanguages)
    if (existingLanguages.length > 0) {
      return {
        errors: [{
          field: "duplication found ",
          message: `${existingLanguages} already exist`
        }]
      }
    }
    const languages = await Languages.findByIds(options.languages);
    const userLanguages = languages.map((language) => {
      const userLanguage = UserLanguages.create({
        _id: Math.floor(Math.random() * 900000) + 100000,
        user_id: user!._id,
        languages_id: language._id,
      });
      return userLanguage.save();
    });

    await Promise.all(userLanguages);
    return { message: "added" }
  }


  @Mutation(() => UpdateResponse)
  async HobbiesAdd(
    @Arg("options") options: hobbiesAdd,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const existingHobbies = await UserHobbies.find({ where: { user_id: user._id, hobbies_id: In(options.hobbies) } });
    if (existingHobbies.length > 0) {
      return {
        errors: [{
          field: "duplication found ",
          message: `${existingHobbies} already exist`
        }]
      }
    }
    const hobbies = await Hobbies.findByIds(options.hobbies);
    const userHobbies = hobbies.map((hobby) => {
      const userHobby = UserHobbies.create({
        _id: Math.floor(Math.random() * 900000) + 100000,
        user_id: user!._id,
        hobbies_id: hobby._id,
      });
      return userHobby.save();
    });

    await Promise.all(userHobbies);
    return { message: "added" }
  }

  @Mutation(() => UpdateResponse)
  async ProfileAdd(
    @Arg("options") options: profilesAdd,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const existingProfiles = await UserSocialProfiles.find({ where: { user_id: user._id, social_profile_id: In(options.profiles.social_profiles) } });
    if (existingProfiles.length > 0) {
      return {
        errors: [{
          field: "duplication found ",
          message: `${existingProfiles} already exist`
        }]
      }
    }
    const socialProfiles = await SocialProfiles.findByIds(options.profiles.social_profiles);
    const userProfiles = socialProfiles.map((_, i) => {
      const userprof = UserSocialProfiles.create({
        _id: Math.floor(Math.random() * 900000) + 100000,
        user_id: user!._id,
        social_profile_id: options.profiles.social_profiles[i],
        url: options.profiles.url[i],
      });
      return userprof.save();
    });

    await Promise.all(userProfiles);
    return { message: "added" }
  }

  @Mutation(() => UpdateResponse)
  async experienceAdd(
    @Arg("options") options: experienceAdd,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const userExperience = options.experiences.map((ex) => {
      const userEx = UserExperiences.create({
        _id: Math.floor(Math.random() * 900000) + 100000,
        user_id: user!._id,
        title: ex.title,
        company_name: ex.company_name,
        description: ex.description,
        date_joined: ex.date_joined,
        date_left: ex.date_left,
      });
      return userEx.save();
    });

    await Promise.all(userExperience);
    return { message: "added" }
  }

  @Mutation(() => UpdateResponse)
  async educationAdd(
    @Arg("options") options: educationAdd,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    const userEducations = options.educations.map((ed) => {
      const userEd = UserEducations.create({
        _id: Math.floor(Math.random() * 900000) + 100000,
        user_id: user!._id,
        title: ed.title,
        institute_name: ed.institute_name,
        description: ed.description,
        date_joined: ed.date_joined,
        date_left: ed.date_left,
      });
      return userEd.save();
    });

    await Promise.all(userEducations);
    return { message: "added" }
  }

  @Mutation(() => UpdateResponse)
  async languageDelete(
    @Arg("options") options: deleteItem,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    let language = UserLanguages.findOne({ where: { user_id: user._id, languages_id: options.id } })
    if (!language) {
      return {
        errors: [{
          field: "Unknown",
          message: "Language not found"
        }],
      }
    }
    await UserLanguages.delete({ languages_id: options.id, user_id: user._id });

    return { message: "deleted" }
  }

  @Mutation(() => UpdateResponse)
  async hobbiesDelete(
    @Arg("options") options: deleteItem,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    let hobbies = UserHobbies.findOne({ where: { user_id: user._id, hobbies_id: options.id } })
    if (!hobbies) {
      return {
        errors: [{
          field: "Unknown",
          message: "hobby not found"
        }],
      }
    }
    await UserHobbies.delete({ hobbies_id: options.id, user_id: user._id });

    return { message: "deleted" }
  }

  @Mutation(() => UpdateResponse)
  async socialDelete(
    @Arg("options") options: deleteItem,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    let socialProfile = UserSocialProfiles.findOne({ where: { user_id: user._id, social_profile_id: options.id } })
    if (!socialProfile) {
      return {
        errors: [{
          field: "Unknown",
          message: "profile not found"
        }],
      }
    }
    await UserSocialProfiles.delete({ social_profile_id: options.id, user_id: user._id });

    return { message: "deleted" }
  }

  @Mutation(() => UpdateResponse)
  async experienceDelete(
    @Arg("options") options: deleteItem,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    let experience = UserExperiences.findOne({ where: { user_id: user._id, _id: options.id } })
    if (!experience) {
      return {
        errors: [{
          field: "Unknown",
          message: "record not found"
        }],
      }
    }
    await UserExperiences.delete({ _id: options.id, user_id: user._id });
    return { message: "deleted" }
  }

  @Mutation(() => UpdateResponse)
  async educationDelete(
    @Arg("options") options: deleteItem,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }
    let education = UserEducations.findOne({ where: { user_id: user._id, _id: options.id } })
    if (!education) {
      return {
        errors: [{
          field: "Unknown",
          message: "record not found"
        }],
      }
    }
    await UserEducations.delete({ _id: options.id, user_id: user._id });
    return { message: "deleted" }
  }

  @Mutation(() => UpdateResponse)
  async deleteUser(
    @Arg("options") options: deleteUser,
  ): Promise<UpdateResponse> {

    let user = await User.findOne({ where: { username: options.username } });
    if (!user) { // if there is no user
      return {
        errors: [{
          field: "Unknown",
          message: "user not found"
        }],
      }
    }

    await UserEducations.delete({ user_id: user._id });
    await UserExperiences.delete({ user_id: user._id });
    await UserSocialProfiles.delete({ user_id: user._id });
    await UserHobbies.delete({ user_id: user._id });
    await UserLanguages.delete({ user_id: user._id });
    await User.delete({ _id: user._id });
    return { message: "deleted" }
  }

}