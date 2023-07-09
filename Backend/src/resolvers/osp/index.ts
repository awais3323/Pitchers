import { Osp } from "entities/osp";
import { Int, Resolver } from "type-graphql";
import { Arg, Ctx, Mutation, Query } from "type-graphql/dist/decorators";
import { MyContext } from "types";
import { createOsp, ospComments } from "./types";
import { Osp_Descriptions } from "entities/osp/osp_descriptions";
import { Osp_Comments } from "entities/osp/osp_comments";
import { Ops_Tags } from "entities/osp/osp_tags";

@Resolver()
export class OspResolver {
    @Query(() => [Osp])
    async osps(
    ): Promise<Osp[]> {
        return await Osp.find()
    }

    @Query(() => Osp, { nullable: true })
    post(
        @Arg('id', () => Int) _id: number,
        @Ctx() { }: MyContext): Promise<Osp | null> {
        return Osp.findOne({ where: { _id } })
    }

    @Mutation(() => Osp)
    async createOsp(
        @Arg('options') options: createOsp,
        @Ctx() { }: MyContext): Promise<Osp> {

      let ospId= Math.floor(Math.random() * 900000) + 100000;
      
        let osp = Osp.create({
            Author: options.Author,
            title: options.title,
            osp_id: ospId
        })
        await osp.save()

        let ospData = options.data.map((od) => {
            const osp_descriptions = Osp_Descriptions.create({
                _id: Math.floor(Math.random() * 899999) + 100000,
                title: od.title,
                description: od.description,
                osp_id:ospId,
            });
            return osp_descriptions.save();
        });

        await Promise.all(ospData);

        let ospTags= options.tags.map((od) => {
            const osp_tags = Ops_Tags.create({
                _id: Math.floor(Math.random() * 899999) + 100000,
                osp_id: ospId,
                tag_name:od,
            });
            return osp_tags.save();
        });

        await Promise.all(ospTags);
        return osp
    }
    @Mutation(() => String)
    async createOspComments(
        @Arg('options') options: ospComments,
        @Ctx() { }: MyContext): Promise<string> {

        let osp = Osp_Comments.create({
            osp_id: options.osp_id,
            username: options.username,
            comment: options.comment
        })
        await osp.save()

        return "Comment Added" 
    }
}