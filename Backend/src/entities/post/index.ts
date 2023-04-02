import { Field, ObjectType } from "type-graphql";
import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @ObjectIdColumn({ type: "int" })
  _id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date = new Date();

  @Field()
  @UpdateDateColumn()
  updatedAt: Date = new Date();
}