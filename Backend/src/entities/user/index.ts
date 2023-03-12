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

    @Field()
    @Property()
    gender: string;

    @Property()
    password!: string;

    @Field(() => Int)
    @Property()
    age!: number;

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}