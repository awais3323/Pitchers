import { User } from "entities/user";
import jwt from "jsonwebtoken"
import { ResponseTypes } from "./types";

function getJWT(id: number, username: string) {

    return jwt.sign({ id: id, username: username }, "thisisjustrf", {
        expiresIn: "5d",
    });
}
export const sendToken = (res: ResponseTypes, user: User, statusCode: number) => {
    const JWT = getJWT(user._id, user.username);

    const options = {
        expires: new Date(Date.now() + 5 + 24 * 60 * 60 * 1000),
        httpOnly: true
    };
    res.status(statusCode).cookie('token', JWT, options)
};