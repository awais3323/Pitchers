import { Post } from "entities/post";
import { Int, Resolver } from "type-graphql";
import { Arg, Ctx, Mutation, Query } from "type-graphql/dist/decorators";
import { MyContext } from "types";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(
        @Ctx() { em }: MyContext
    ): Promise<Post[]> {

        return em.find(Post, {})
    }

    @Query(() => Post, { nullable: true })
    post(
        @Arg('id', () => Int) _id: number,
        @Ctx() { em }: MyContext): Promise<Post | null> {

        return em.findOne(Post, { _id })
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('title') title: string,
        @Ctx() { em }: MyContext): Promise<Post> {

        let post = em.create(Post, {
            title,
            createdAt: "",
            updatedAt: ""
        })
        await em.persistAndFlush(post)
        return post
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id', () => Int) _id: number,
        @Arg('title', { nullable: true }) title: string,
        @Ctx() { em }: MyContext): Promise<Post | null> {

        let post = await em.findOne(Post, { _id })
        if (!post) {
            return null
        }
        if (typeof title !== undefined) {
            post.title = title
            await em.persistAndFlush(post);
        }

        return post;
    }


    @Mutation(() => Boolean)
    async deletePost(
        @Arg('id', () => Int) _id: number,
        @Ctx() { em }: MyContext): Promise<Boolean> {
            await em.nativeDelete(Post, { _id })
        return true;
    }
}