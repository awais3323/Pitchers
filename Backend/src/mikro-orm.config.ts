import { Options } from "@mikro-orm/core";
import { Post } from "./entities/post";
import path from "path";
import { __prod__ } from "./constants";

const config: Options = {
    migrations: {
        path: path.join(__dirname, './migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // regex for including only ts and js files
    },
    user:"postgres",
    password:"3813323",
    allowGlobalContext: true,
    entities: [Post],
    dbName: "pitchers",
    type: "postgresql",
    debug: !__prod__,
}
export default config;