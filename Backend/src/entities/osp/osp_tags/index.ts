import { Osp } from "..";
import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToMany } from "typeorm";

@ObjectType()
@Entity()
export class Ops_Tags extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    osp_id: number


    @Field()
    @Column()
    tag_name:string 

    @ManyToMany(() => Osp, (osp) => osp.osp_tags)
    osps: Osp[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}