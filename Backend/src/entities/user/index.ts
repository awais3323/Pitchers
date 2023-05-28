import { Field, Int, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { ObjectIdColumn } from "typeorm/decorator/columns/ObjectIdColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { BaseEntity } from "typeorm/repository/BaseEntity";
import {Languages} from "entities/langauges"
import { UserLanguages } from "./user_languages";
import { Hobbies } from "entities/hobbies";
import { UserHobbies } from "./user_hobbies";
import { SocialProfiles } from "entities/social_profiles";
import { UserSocialProfiles } from "./user_social_profiles";


@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @ObjectIdColumn({type:"int"})
    _id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    intro: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phone_no: number;

    @Field()
    @Column()
    profile_urls: string;

    @Field()
    @Column()
    gender: string;

    @Field(() => Int)
    @Column()
    age!: number;

    @Field(() => Int)
    @Column()
    date_of_birth: string;

    @ManyToMany(() => Languages, (language) => language.users)
    @JoinTable()
    languages: Languages[];

    @OneToMany(() => UserLanguages, (userLanguage) => userLanguage.language)
    user_languages: UserLanguages[];

    @ManyToMany(() => Hobbies, (hobby) => hobby.users)
    @JoinTable()
    hobbies: Hobbies[];

    @OneToMany(() => UserHobbies, (userHobby) => userHobby.hobby)
    user_hobbies: UserHobbies[];

    @ManyToMany(() => SocialProfiles, (SP) => SP.users)
    @JoinTable()
    social_profile: SocialProfiles[];

    @OneToMany(() => UserSocialProfiles, (SP) => SP.social_profile)
    user_social_profile: UserSocialProfiles[];

    @Field()
    @CreateDateColumn()
    createdAt: Date = new Date();

    @Field()
    @UpdateDateColumn()
    updatedAt: Date = new Date();
}