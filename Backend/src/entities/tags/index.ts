import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class Tags {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number

    @Field()
    @Column()
    name: string
}