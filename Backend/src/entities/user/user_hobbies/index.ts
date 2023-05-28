import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, BaseEntity } from "typeorm";
import { User } from "..";
import { Hobbies } from "entities/hobbies";

@ObjectType()
@Entity()
export class UserHobbies extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    user_id: number

    @Field()
    @Column()
    hobbies_id: number

    @ManyToOne(() => User, (user) => user.hobbies, { cascade: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Hobbies, (hobby) => hobby.userHobbies, { cascade: true })
    @JoinColumn({ name: "hobbies_id" })
    hobby: Hobbies;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}