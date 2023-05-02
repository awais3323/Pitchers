import { User } from "entities/user";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, ObjectIdColumn, OneToMany, UpdateDateColumn } from "typeorm";
import { UserLanguages } from "entities/user/user_languages";

@ObjectType()
@Entity()
export class Languages extends BaseEntity{

    @Field()
    @ObjectIdColumn({type:"int"})
    _id!: number;

    @Field()
    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user.languages)
    users: User[];

    @OneToMany(() => UserLanguages, (userLanguage) => userLanguage.language)
    userLanguages: UserLanguages[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}