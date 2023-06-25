import { Field, Int, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, BaseEntity } from "typeorm";
import { Osp } from "..";

@ObjectType()
@Entity()
export class Osp_Descriptions extends BaseEntity{

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    _id!: number;

    @Field()
    @Column()
    osp_id:number 
    
    @Field()
    @Column()
    title: string

    @Field()
    @Column()
    description: string

    @ManyToMany(() => Osp, (osp) => osp.osp_descriptions)
    osps: Osp[];

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}