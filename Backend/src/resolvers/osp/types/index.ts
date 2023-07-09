import { Osp } from "entities/osp"
import { Osp_Descriptions } from "entities/osp/osp_descriptions"
import { Ops_Tags } from "entities/osp/osp_tags"
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
export class ospDesc {
    @Field()
    title: string

    @Field()
    description: string
}

@InputType()
export class ospComments{
    @Field()
    username:string 

    @Field()
    osp_id:number 

    @Field()
    comment: string
}

@ObjectType()
export class ospDetails{

    @Field({nullable:true})
    osp: Osp

    @Field(()=> [Osp_Descriptions])
    ospDescriptions:Osp_Descriptions
    
    @Field(()=> [Ops_Tags])
    ospTags:Ops_Tags

}