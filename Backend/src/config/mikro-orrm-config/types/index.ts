import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { User } from "entities/user";
import { ResponseTypes } from "utils/jwt/types"

interface MyRequest extends Request {
  user?: User;
}

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    res:ResponseTypes
    req:MyRequest
}
