import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Osp_Tickets_Tags{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;
    
    @Field()
    @Column()
    ticket_id:number

    @Field()
    @Column()
    tags_id:number

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}