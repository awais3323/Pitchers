import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Osp_Tickets_Comments {
    
    @Field(() => Int)
    @PrimaryKey()
    _id!: number;

    @Field()
    @Property()
    ticket_id:number

    @Field()
    @Property()
    user_id:number
    
    @Field()
    @Property()
    comment:string
    
    @Field()
    @Property({ type: "date" })
    createdAt: Date = new Date();

    @Field()
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();
}