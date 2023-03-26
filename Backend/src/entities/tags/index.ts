import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Tags {
    @Field(() => Int)
    @PrimaryKey()
    _id!: number

    @Field()
    @Property()
    name: string
}