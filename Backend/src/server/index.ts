import { MikroORM } from "@mikro-orm/core"
import { Post } from "../entities/post";
import { __prod__ } from "../constants"
import mikroOrmConfig from "../mikro-orm.config"

const main = async () => {

    const orm = await MikroORM.init(mikroOrmConfig);
    await orm.isConnected()
    // await orm.getMigrator().up();  // run the migrations every time server starts 
    let emFork = orm.em.fork({})
    const post = emFork.create(Post, {
        title: "migrations are not being built",
        createdAt: "",
        updatedAt: ""
    })
    await emFork.persistAndFlush(post);

    // Simple commands to get all the posts 
    // const getAllPosts = await emFork.find(Post,{});
    // console.log(getAllPosts)
}

main().catch(err => {
    console.log(err)
});