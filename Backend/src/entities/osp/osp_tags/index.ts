import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class osp_tags {

    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    osp_id: number

    @Field()
    @Property()
    tags_id: number

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}