import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Osp_Issues {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    osp_id: number

    @Field()
    @Column()
    title: number

    @Field()
    @Column()
    description: number

    @Field()
    @Column()
    error_log: number

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}