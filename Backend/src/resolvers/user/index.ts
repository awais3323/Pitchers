import argon2 from "argon2";
import { User } from "entities/user";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "types";
import { sendToken } from "utils/jwt";
import { LoginUser, UserRegister, UserResponse } from "./types";

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async registeUser(
        @Arg("options") options: UserRegister,
        @Ctx() { em, res }: MyContext): Promise<UserResponse> {
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
        let user = em.create(User, {
            username: options.username,
            password: hashedPassword,
            name: options.name,
            age: options.age,
            gender: options.gender,
            createdAt: "",
            updatedAt: "",
        })

        try {
            await em.persistAndFlush(user)
        } catch (err) {
            if (err.code === "23505") { // If the username is already taken
                return {
                    errors: [{
                        field: "Username",
                        message: "Username is unavailable"
                    }]
                }
            }
        }

        sendToken(res, user, 200)
        return { user };
    }

    @Mutation(() => UserResponse)
    async loginUser(
        @Arg("options") options: LoginUser,
        @Ctx() { em }: MyContext): Promise<UserResponse> {

        let user = await em.findOne(User, { username: options.username })
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
        return { user };
    }
}