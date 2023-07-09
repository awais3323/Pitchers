import __prod__ from "constants";
import { Hobbies } from "entities/hobbies";
import { Languages } from "entities/langauges";
import { Osp } from "entities/osp";
import { Osp_Comments } from "entities/osp/osp_comments";
import { Osp_Descriptions } from "entities/osp/osp_descriptions";
import { Ops_Tags } from "entities/osp/osp_tags";
import { Post } from "entities/post";
import { Post_Comments } from "entities/post/post_comments";
import { Post_Reactions } from "entities/post/post_reactions";
import { Post_Tags } from "entities/post/post_tags";
import { Reactions } from "entities/reactions";
import { SocialProfiles } from "entities/social_profiles";
import { Tags } from "entities/tags";
import { User } from "entities/user";
import { UserEducations } from "entities/user/user_education";
import { UserExperiences } from "entities/user/user_experiences";
import { UserHobbies } from "entities/user/user_hobbies";
import { UserLanguages } from "entities/user/user_languages";
import { UserSocialProfiles } from "entities/user/user_social_profiles";
import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
    type: "postgres",
    database: "pitcherdb",
    username: "postgres",
    password: "3813323",
    logging: true,
    // synchronize: true,
    entities: [
        Post,
        Post_Tags,
        Post_Reactions,
        Post_Comments,
        User,
        UserLanguages,
        UserSocialProfiles,
        UserExperiences,
        UserEducations,
        UserHobbies,
        Osp,
        Osp_Comments,
        Ops_Tags,
        Osp_Descriptions,
        Languages,
        Tags,
        Hobbies,
        SocialProfiles,
        Reactions,
    ],
})