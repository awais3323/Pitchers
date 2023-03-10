import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "../constants"
import mikroOrmConfig from "../mikro-orm.config"
import express from "express"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "../resolvers/hello"

const main = async () => {

    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.isConnected()

    const app = express();
    app.use(express.json());
    let port = 3000;
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    })
    
    await apolloServer.start()
    apolloServer.applyMiddleware({ app })
    app.listen(port, () => {
        console.log(`App is running .... port ${port}`)
    })

}

main().catch(err => {
    console.log(err)
});