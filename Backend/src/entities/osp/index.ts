// OPEN SOURCE PROJECTS
import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, BaseEntity } from "typeorm";
import { Osp_Descriptions } from "./osp_descriptions";
import { Ops_Tags } from "./osp_tags";

@ObjectType()
@Entity()
export class Osp extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    _id: number;

    @Field()
    @Column()
    Author: number;

    @Field()
    @Column()
    osp_id: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Osp_Descriptions, (od) => od.osps)
    osp_descriptions: Osp_Descriptions[];

    @OneToMany(() => Ops_Tags, (od) => od.osps)
    osp_tags: Ops_Tags[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
