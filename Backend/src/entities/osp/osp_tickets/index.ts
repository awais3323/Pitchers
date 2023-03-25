import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class osp_languages {

    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    user_id:number

    @Field()
    @Property()
    title:string

    @Field()
    @Property()
   description:string

    @Field()
    @Property()
    status:string

    @Field()
    @Property()
    priority:number

    @Field()
    @Property()
    creator:string

    @Field()
    @Property()
    tester:string

    @Field()
    @Property()
    type:string

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}