// OPEN SOURCE PROJECTS
import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Osp {
    @Field()
    @PrimaryKey()
    _id: number;

    @Field()
    @Property()
    Author: string;

    @Field()
    @Property()
    description: string;

    @Field()
    @Property()
    title: string;

    @Field()
    @Property()
    vision: string;

    @Field()
    @Property()
    completeness: string;

    @Field()
    @Property()
    category: string;

    @Field()
    @Property()
    repo_url: string;

    @Field()
    @Property()
    issues: string;

    @Field()
    @Property()
    stars: string;

    @Field()
    @Property()
    contributors: string;
    
    @Field()
    @Property()
    type: string;

    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}
