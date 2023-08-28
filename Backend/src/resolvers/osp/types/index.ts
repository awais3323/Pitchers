import { Osp } from "entities/osp"
import { Osp_Comments } from "entities/osp/osp_comments"
import { Osp_Descriptions } from "entities/osp/osp_descriptions"
import { Ops_Tags } from "entities/osp/osp_tags"
import { User } from "entities/user"
import { InputType, Field, ObjectType } from "type-graphql"

@InputType()
export class createOsp {
    @Field()
    Author: number

    @Field()
    title: string

    @Field()
    description: string

    @Field(() => [ospDesc])
    data: ospDesc[]

    @Field(() => [String])
    tags: string[]
}

@InputType()
export class getOspById {
    @Field()
    user_id: number

    @Field()
    id: number
}


@InputType()
export class getOspByArgs {
    @Field()
    value:string 

    @Field()
    arg:string 
}

@InputType()
export class ospDesc {
    @Field()
    title: string

    @Field()
    description: string
}

@InputType()
export class ospComments {
    @Field()
    username: string

    @Field()
    osp_id: number

    @Field()
    comment: string

    @Field()
    parent_id: string
}

@InputType()
export class updateOspComments{
    @Field()
    id: number

    @Field()
    comment: string
}

@ObjectType()
export class ospDetails {

    @Field({ nullable: true })
    osp: Osp

    @Field({ nullable: true })
    user: User

    @Field(() => [Osp_Descriptions])
    ospDescriptions: Osp_Descriptions

    @Field(() => [Ops_Tags])
    ospTags: Ops_Tags

    @Field(() => [Osp_Comments])
    ospComments: Osp_Comments
}

@ObjectType()
export class OspCommentsByParentId {

    @Field(() => [Osp_Comments])
    ospSubComments: Osp_Comments
}