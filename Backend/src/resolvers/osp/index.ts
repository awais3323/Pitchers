import { Osp } from "entities/osp";
import { Int, Resolver } from "type-graphql";
import { Arg, Ctx, Mutation, Query } from "type-graphql/dist/decorators";
import { MyContext } from "types";
import { OspCommentsByParentId, createOsp, getOspByArgs, getOspById, ospComments, ospDetails, updateOspComments } from "./types";
import { Osp_Descriptions } from "entities/osp/osp_descriptions";
import { Osp_Comments } from "entities/osp/osp_comments";
import { Ops_Tags } from "entities/osp/osp_tags";
import { User } from "entities/user";

async function getOspByUser(value: string) {
    let userOsps = await Osp.find({ where: { Author: parseInt(value) } })
    return userOsps
}

async function getOspByTitle(value: string) {
    let userOsps = await Osp.find()
    let titleOsps: any[] = [];
    userOsps.forEach(ele => {
        if (ele.title.toLowerCase() == value.toLowerCase() || ele.title.toLowerCase().startsWith(value) || ele.title.toLowerCase().endsWith(value)) {
            titleOsps.push(ele);
        }
    })
    return titleOsps;
}

async function getOspByTag(value: string) {
    let userOsps = await Ops_Tags.find({ where: { tag_name: value } })
    let tagsOsp: any[] = [];
    userOsps.forEach(async ele => {
        let osp = await Osp.findOne({ where: { osp_id: ele.osp_id } })
        tagsOsp.push(osp)
    })
    return tagsOsp;
}
@Resolver()
export class OspResolver {
    @Query(() => [Osp]) async osps(): Promise<Osp[]> {
        let osp = await Osp.find()
        return osp;
    }

    @Query(() => ospDetails, { nullable: true })
    async getOspById(@Arg('options') options: getOspById): Promise<any | null> {
        let osp = await Osp.findOne({ where: { _id: options.id } })
        let ospId = osp?.osp_id
        let user = User.findOne({ where: { _id: osp?.Author } })
        let ospDescriptions = await Osp_Descriptions.find({ where: { osp_id: ospId } })
        let ospTags = await Ops_Tags.find({ where: { osp_id: ospId } })
        let ospComments = await Osp_Comments.find({ where: { osp_id: ospId } })
        return { user, osp, ospDescriptions, ospTags, ospComments };
    }

    @Query(() => [Osp], { nullable: true })
    async getOspByArgs(@Arg('options') options: getOspByArgs): Promise<Osp[]> {
        if (options.arg == "user") {
            return await getOspByUser(options.value)
        }
        else if (options.arg == "title") {
            return await getOspByTitle(options.value)
        }
        else if (options.arg == "tag") {
            return await getOspByTag(options.value)
        }
        return [];
    }

    @Mutation(() => Osp)
    async createOsp(
        @Arg('options') options: createOsp,
        @Ctx() { }: MyContext): Promise<Osp> {

        let ospId = Math.floor(Math.random() * 900000) + 100000;

        let osp = Osp.create({
            Author: options.Author,
            title: options.title,
            description: options.description,
            osp_id: ospId
        })
        await osp.save()

        let ospData = options.data.map((od) => {
            const osp_descriptions = Osp_Descriptions.create({
                _id: Math.floor(Math.random() * 899999) + 100000,
                title: od.title,
                description: od.description,
                osp_id: ospId,
            });
            return osp_descriptions.save();
        });

        await Promise.all(ospData);

        let ospTags = options.tags.map((od) => {
            const osp_tags = Ops_Tags.create({
                _id: Math.floor(Math.random() * 899999) + 100000,
                osp_id: ospId,
                tag_name: od.split(" ").join("-"),
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
            comment: options.comment,
            parent_id: options.parent_id,
            edited: false
        })
        await osp.save()

        return "Comment added successfully"
    }

    @Mutation(() => String)
    async createOspCommentsByParents(
        @Arg('options') options: ospComments,
        @Ctx() { }: MyContext): Promise<string> {

        let osp = Osp_Comments.create({
            // we are making the osp_id > parent_id so the sub comments doesn't show with the main comments
            osp_id: parseInt(options.parent_id),
            username: options.username,
            comment: options.comment,
            parent_id: options.parent_id,
            edited: false
        })
        await osp.save()

        return "Comment added successfully"
    }

    @Mutation(() => String)
    async deleteOspComment(
        @Arg('id', () => Int) id: number,
        @Ctx() { }: MyContext): Promise<string> {

        await Osp_Comments.delete(id)
        return "Comment delete Successfully"
    }

    @Mutation(() => String)
    async updateOspComment(
        @Arg('options') options: updateOspComments,
        @Ctx() { }: MyContext): Promise<string> {

        let ospComment = await Osp_Comments.findOne({ where: { _id: options.id } })
        if (!ospComment) {
            return "Sorry, Osp not found"
        }
        ospComment.comment = options.comment;
        ospComment.edited = true;
        await ospComment.save()

        return "Comment updated successfully"
    }

    @Query(() => OspCommentsByParentId, { nullable: true })
    async getOspCommentsByParentId(@Arg('parentId', () => Int) parentId: number): Promise<any | null> {
        let ospSubComments = await Osp_Comments.find({ where: { parent_id: parentId.toString() } })
        return { ospSubComments };
    }

}