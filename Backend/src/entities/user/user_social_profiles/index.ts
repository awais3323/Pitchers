import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User_Social_Profiles{

    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    user_id: number

    @Field()
    @Property()
    social_profile_id: number

    @Field()
    @Property()
    url: number

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}