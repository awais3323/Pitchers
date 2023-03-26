import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User_Hobbies {

    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    user_id: number

    @Field()
    @Property()
    hobbies_id: number

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}