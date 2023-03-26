import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core"
import { ResponseTypes } from "utils/jwt/types"

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>
    res:ResponseTypes
}
