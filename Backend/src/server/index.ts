import "reflect-metadata"
import __prod__ from "constants"
import { appDataSource } from "database/dbConnection"
import { buildSchema } from "type-graphql"
import { HelloResolver } from "resolvers/hello"
import { PostResolver } from "resolvers/post"
import { UserResolver } from "resolvers/user"
import { ApolloServer } from "@apollo/server"
import { LanguageResolver } from "resolvers/languages"
import { HobbiesResolver } from "resolvers/hobbies"
import { SocialProfileResolver } from "resolvers/social_profiles"
import { expressMiddleware } from '@apollo/server/express4';
import { app } from "./app"
import { OspResolver } from "resolvers/osp"

const main = async () => {
    await appDataSource.initialize().then(() => console.log("Database is connected ..... Ok"))

    let port = 3000;
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver, PostResolver, UserResolver, LanguageResolver, HobbiesResolver, SocialProfileResolver, OspResolver],
            validate: false
        }),
    })

    await apolloServer.start();
    app.use(
        '/graphql',
        expressMiddleware(apolloServer, {
            context: async ({ req, res }) => ({ res, req }),
        }),
    );

    app.get("/", (_, res) => {
        res.send(`Congratulations, App is running on ___ port ${port}`)
    })

    app.listen(port, () => {
        console.log(`App is running on ${port} ..... OK`)
    })
}

main().catch(err => {
    console.log(err)
});