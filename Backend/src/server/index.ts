import { MikroORM } from "@mikro-orm/core"
import __prod__ from "constants"
import mikroOrmConfig from "config/mikro-orrm-config"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "resolvers/hello"
import { PostResolver } from "resolvers/post"
import { UserResolver } from "resolvers/user"
import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from '@apollo/server/express4';
import { app } from "./app"

const main = async () => {

    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.isConnected()

    let port = 3000;
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver],
            validate: false
        }),
    })

    await apolloServer.start();
    app.use(
        '/graphql',
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => ({ em: orm.em, res: res, req: req }),
        }),
    );

    app.get("/", (_, res) => {
        res.send(`Congratulations, App is running on ___ port ${port}`)
    })

    app.listen(port, () => {
        console.log(`App is running .... port ${port}`)
    })
}

main().catch(err => {
    console.log(err)
});