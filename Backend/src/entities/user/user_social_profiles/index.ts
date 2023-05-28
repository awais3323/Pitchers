import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "..";
import { SocialProfiles } from "entities/social_profiles";

@ObjectType()
@Entity()
export class UserSocialProfiles extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    user_id: number

    @Field()
    @Column()
    social_profile_id: number

    @Field()
    @Column()
    url:string 

    @ManyToOne(() => User, (user) => user.hobbies, { cascade: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => SocialProfiles, (SP) => SP, { cascade: true })
    @JoinColumn({ name: "social_profile_id" })
    social_profile: SocialProfiles;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}