import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Osp_Contributers {
    
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    osp_id:number

    @Field()
    @Column()
    user_id:number
    
    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}