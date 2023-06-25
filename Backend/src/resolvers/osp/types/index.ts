import { InputType, Field } from "type-graphql"

@InputType()
export class createOsp {
    @Field()
    Author: number

    @Field()
    title: string

    @Field(() => [ospDesc])
    data: ospDesc[]
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