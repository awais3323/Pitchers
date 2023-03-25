import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User {
    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property({ unique: true })
    username!: string;

    @Property()
    password!: string;

    @Field()
    @Property()
    title: string;

    @Field()
    @Property()
    intro: string;

    @Field()
    @Property()
    email: string;

    @Field()
    @Property()
    phone_no: number;

    @Field()
    @Property()
    profile_urls: string;

    @Field()
    @Property()
    gender: string;

    @Field(() => Int)
    @Property()
    age!: number;

    @Field(() => Int)
    @Property()
    date_of_birth: string;

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}