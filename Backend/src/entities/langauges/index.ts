import { Field, Int, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Langauges {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    name: string;

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}