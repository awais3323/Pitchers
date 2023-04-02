import { User } from "entities/user";
import { ResponseTypes } from "utils/jwt/types"

interface MyRequest extends Request {
  user?: User;
}

export type MyContext = {
    res:ResponseTypes
    req:MyRequest
}