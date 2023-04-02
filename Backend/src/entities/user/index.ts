import { Field, Int, ObjectType } from "type-graphql";
import { Entity } from "typeorm";
import { Column } from "typeorm/decorator/columns/Column";
import { CreateDateColumn } from "typeorm/decorator/columns/CreateDateColumn";
import { ObjectIdColumn } from "typeorm/decorator/columns/ObjectIdColumn";
import { UpdateDateColumn } from "typeorm/decorator/columns/UpdateDateColumn";
import { BaseEntity } from "typeorm/repository/BaseEntity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @ObjectIdColumn({type:"int"})
    _id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ unique: true })
    username!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    intro: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    phone_no: number;

    @Field()
    @Column()
    profile_urls: string;

    @Field()
    @Column()
    gender: string;

    @Field(() => Int)
    @Column()
    age!: number;

    @Field(() => Int)
    @Column()
    date_of_birth: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date = new Date();

    @Field()
    @UpdateDateColumn()
    updatedAt: Date = new Date();
}