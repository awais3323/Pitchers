import {Languages} from "../..//langauges"
import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, ObjectIdColumn, BaseEntity, JoinColumn } from "typeorm";
import { User } from "..";

@ObjectType()
@Entity()
export class UserLanguages extends BaseEntity{

    @Field()
    @ObjectIdColumn({type:"int"})
    _id!: number;

    @Field()
    @Column()
    user_id: number

    @Field()
    @Column()
    languages_id: number

    @ManyToOne(() => User, (user) => user.languages, {cascade:true})
    @JoinColumn({name: "user_id"})
    user: User;

    @ManyToOne(() => Languages, (language) => language.userLanguages ,{cascade:true})
    @JoinColumn({name: "languages_id"})
    language: Languages;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}