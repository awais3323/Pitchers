import { Post } from "entities/post";
import { Int, Resolver } from "type-graphql";
import { Arg, Ctx, Mutation, Query } from "type-graphql/dist/decorators";
import { MyContext } from "types"
import { isAuthenticatedUser } from "middleware/auth";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    async posts(
        @Ctx() { req }: MyContext
    ): Promise<Post[]> {
        await isAuthenticatedUser(req)
        console.log(req.user?._id) // Here the token has been setup and the user is not getting authenticated
        return await Post.find()
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) _id: number,
        @Ctx() { }: MyContext): Promise<Post | null> {
        return Post.findOne({ where: { _id } })
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { }: MyContext): Promise<Post> {

        let post = Post.create({
            _id: Math.floor(Math.random() * 900000) + 100000,
            title,
        })
        post.save()
        return post
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id', () => Int) _id: number,
        @Arg('title', { nullable: true }) title: string,
        @Ctx() { }: MyContext): Promise<Post | null> {

        let post = await Post.findOne({ where: { _id } })
        if (!post) {
            return null
        }
        if (typeof title !== undefined) {
            post.title = title
            Post.update({ _id }, { title })
        }
        return post;
    }


    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id', () => Int) _id: number,
        @Ctx() { }: MyContext): Promise<Boolean> {
        await Post.delete(_id)
        return true;
    }
}