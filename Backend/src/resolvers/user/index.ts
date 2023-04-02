import argon2 from "argon2";
import { User } from "entities/user";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { sendToken } from "utils/jwt";
import { MyContext } from "types";
import { LoginUser, UserRegister, UserResponse } from "./types";
import { isAuthenticatedUser } from "middleware/auth";

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async registeUser(
        @Arg("options") options: UserRegister,
        @Ctx() { res }: MyContext): Promise<UserResponse | undefined> {
        if (options.username.length <= 3) { //username length issue
            return {
                errors: [{
                    field: "Username",
                    message: "username must be atleast 3 letters"
                }],
            }

        }

        if (options.password.length <= 4) { // password length issue
            return {
                errors: [{
                    field: "Password",
                    message: "Password length  must be greater than 3"
                }],
            }

        }

        const hashedPassword = await argon2.hash(options.password)
        let user;
        const checkUser = await User.findOne({ where: { username: options.username } })
        if (checkUser) {
            return {
                errors: [{
                    field: 'username',
                    message: 'Username is unavailable',
                }],
            }
        } else {
            user = User.create({
                _id: Math.floor(Math.random() * 900000) + 100000,
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
            })
            user?.save()
            sendToken(res, user, 200)
        }
        return { user };

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