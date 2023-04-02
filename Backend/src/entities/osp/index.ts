// OPEN SOURCE PROJECTS
import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Osp {
    @Field()
    @PrimaryGeneratedColumn()
    _id: number;

    @Field()
    @Column()
    Author: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    vision: string;

    @Field()
    @Column()
    completeness: string;

    @Field()
    @Column()
    category: string;

    @Field()
    @Column()
    repo_url: string;

    @Field()
    @Column()
    issues: string;

    @Field()
    @Column()
    stars: string;

    @Field()
    @Column()
    contributors: string;
    
    @Field()
    @Column()
    type: string;

    @Field()
        @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
