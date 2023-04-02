import __prod__ from "constants";
import { Hobbies } from "entities/hobbies";
import { Langauges } from "entities/langauges";
import { Osp } from "entities/osp";
import { Osp_Comments } from "entities/osp/osp_comments";
import { Osp_Contributers } from "entities/osp/osp_contributers";
import { Osp_Issues } from "entities/osp/osp_issues";
import { Osp_Languages } from "entities/osp/osp_languages";
import { Osp_Tags } from "entities/osp/osp_tags";
import { Osp_Tickets } from "entities/osp/osp_tickets";
import { Osp_Tickets_Comments } from "entities/osp/osp_tickets/osp_tickets_comments";
import { Osp_Tickets_Languages } from "entities/osp/osp_tickets/osp_tickets_languages";
import { Osp_Tickets_Tags } from "entities/osp/osp_tickets/osp_tickets_tags";
import { Post } from "entities/post";
import { Post_Comments } from "entities/post/post_comments";
import { Post_Reactions } from "entities/post/post_reactions";
import { Post_Tags } from "entities/post/post_tags";
import { Reactions } from "entities/reactions";
import { Social_Profiles } from "entities/social_profiles";
import { Tags } from "entities/tags";
import { User } from "entities/user";
import { User_Hobbies } from "entities/user/user_hobbies";
import { User_Languages } from "entities/user/user_languages";
import { User_Social_Profiles } from "entities/user/user_social_profiles";
import { DataSource } from "typeorm";

// const config: Options = {
//     migrations: {
//         path: path.join(__dirname, "./migrations"), // path to the folder with migrations
//         glob: "!(*.d).{js,ts}", // regex for including only ts and js files
//     },
//     user: "postgres",
//     password: "3813323",
//     allowGlobalContext: true,
//     entities: [
//         Post,
//         Post_Tags,
//         Post_Reactions,
//         Post_Comments,
//         User,
//         User_Languages,
//         User_Social_Profiles,
//         User_Hobbies,
//         Osp,
//         Osp_Contributers,
//         Osp_Issues,
//         Osp_Comments,
//         Osp_Languages,
//         Osp_Tags,
//         Osp_Tickets,
//         Osp_Tickets_Comments,
//         Osp_Tickets_Languages,
//         Osp_Tickets_Tags,
//         Langauges,
//         Tags,
//         Hobbies,
//         Social_Profiles,
//         Reactions,
//     ],
//     dbName: "pitchers",
//     type: "postgresql",
//     debug: !__prod__,
// };

export const appDataSource = new DataSource({
    type: "postgres",
    database: "pitcherdb",
    username: "postgres",
    password: "3813323",
    logging: true,
    synchronize: true,
    entities: [
        Post,
        Post_Tags,
        Post_Reactions,
        Post_Comments,
        User,
        User_Languages,
        User_Social_Profiles,
        User_Hobbies,
        Osp,
        Osp_Contributers,
        Osp_Issues,
        Osp_Comments,
        Osp_Languages,
        Osp_Tags,
        Osp_Tickets,
        Osp_Tickets_Comments,
        Osp_Tickets_Languages,
        Osp_Tickets_Tags,
        Langauges,
        Tags,
        Hobbies,
        Social_Profiles,
        Reactions,
    ],
})
// export default config;