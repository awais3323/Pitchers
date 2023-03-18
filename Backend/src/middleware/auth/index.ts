import { User } from "entities/user";
import jwt from "jsonwebtoken"
export const isAuthenticatedUser = async (req: any, em: any): Promise<void> => {
    const { token } = req.cookies;
    if (!token) {
        throw new Error("Please Login first..")
    }
    try {
        const decodedData = jwt.verify(token, "thisisjustrf")
        const orm = em

        if (typeof decodedData === 'string') {
            throw new Error('Invalid token'); // Handle the case where 'decodedData' because jwt.verify return string when there os a error 
        } else {
            const { id } = decodedData; // Handle the case where 'decodedData' is a JwtPayload object
            let _id = id
            const user = await orm.findOne(User, { _id })
            if (!user) {
                throw new Error("There is no user")
            }
            req.user = user
        }
    } catch (error) {
        throw new Error("Unable to fetch data from database" + error)
    }
}