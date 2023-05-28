import { User } from "entities/user";
import { UserSocialProfiles } from "entities/user/user_social_profiles";
import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToMany, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class SocialProfiles extends BaseEntity {

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    name: string;

    @ManyToMany(() => User, (user) => user)
    users: User[];

    @OneToMany(() => UserSocialProfiles, (SP) => SP.social_profile)
    socialProfile: SocialProfiles[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}