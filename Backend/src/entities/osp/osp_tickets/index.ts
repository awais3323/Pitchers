import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Osp_Tickets{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    user_id:number

    @Field()
    @Column()
    title:string

    @Field()
    @Column()
   description:string

    @Field()
    @Column()
    status:string

    @Field()
    @Column()
    priority:number

    @Field()
    @Column()
    creator:string

    @Field()
    @Column()
    tester:string

    @Field()
    @Column()
    type:string

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}