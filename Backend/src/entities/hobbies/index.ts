import { User } from "entities/user";
import { UserHobbies } from "entities/user/user_hobbies";
import { Field, Int, ObjectType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity, BaseEntity, ManyToMany, OneToMany } from "typeorm";

@ObjectType()
@Entity()
export class Hobbies extends BaseEntity{
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    name: string
    
    @ManyToMany(() => User, (user) => user)
    users: User[];

    @OneToMany(() => UserHobbies, (userHobby) => userHobby.hobby)
    userHobbies: UserHobbies[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}