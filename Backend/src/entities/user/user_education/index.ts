import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, ObjectIdColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { User } from "..";

@ObjectType()
@Entity()
export class UserEducations extends BaseEntity {
    @Field()
    @ObjectIdColumn({ type: "int" })
    _id!: number;

    @Field()
    @Column()
    user_id: number

    @Field()
    @Column()
    title!: string;

    @Field()
    @Column()
    description!: string;

    @Column()
    institute_name!: string;

    @Field()
    @Column()
    date_joined: string;

    @Field()
    @Column()
    date_left: string;

    @ManyToMany(() => User, (user) => user.user_educations)
    users: User[];

    @Field()
    @CreateDateColumn()
    createdAt: Date = new Date();

    @Field()
    @UpdateDateColumn()
    updatedAt: Date = new Date();
}