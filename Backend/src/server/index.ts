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
import cors from "cors"

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
        cors<cors.CorsRequest>({
            origin: true,
            credentials: true,
        }),
        expressMiddleware(apolloServer, {
            context: async ({ res, req }) => ({ res, req }),
        }),
    );

    app.get("/", (_, res) => {
        res.send(`Congratulations, App is running on ___ port ${port}`)
    })
    app.get("/sendToken", (_, res) => {
        // const options = {
        //     expires: new Date(
        //         Date.now() + 5 + 24 * 60 * 60 * 1000
        //     ),
        //     httpOnly: true
        // }
        // res.status(201).cookie('token', "It is working", options)
        res.send('hello')
    })

    app.listen(port, () => {
        console.log(`App is running on ${port} ..... OK`)
    })
}

main().catch(err => {
    console.log(err)
});