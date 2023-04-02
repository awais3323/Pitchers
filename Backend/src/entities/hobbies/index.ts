import { Field, Int, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@ObjectType()
@Entity()
export class Hobbies{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    name:number

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}