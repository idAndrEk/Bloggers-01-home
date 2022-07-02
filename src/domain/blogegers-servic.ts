import {bloggersRepository} from "../repositories/bloggers-db-repository";
import {ObjectId} from "mongodb";
import {BloggersResponseType, PaginationType} from "../types/bloggersTypes";
import {PostsType} from "../types/postsTypes";
import {postCollection} from "../repositories/db";
import {postsRepositories} from "../repositories/posts-db-repository";

export const bloggersService = {
    async allBloggers(page: number, pageSize: number, name?: string): Promise<PaginationType<BloggersResponseType>> {
        return await bloggersRepository.allBloggers(page, pageSize)
    },

    // async findBloggersName(name: string): Promise<any> {
    //     return await bloggersRepository.findBloggersName(name)
    // },

    async findBloggerById(id: number): Promise<BloggersResponseType | null> {
        return await bloggersRepository.findBloggerById(id);
    },

    async createBlogger(name: string, youtubeUrl: string): Promise<BloggersResponseType | null> {
        const newBlogger = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const createdBlogger = await bloggersRepository.createBlogger(newBlogger)
        if (createdBlogger) {
            return createdBlogger
        }
        return null
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return await bloggersRepository.updateBlogger(id, name, youtubeUrl)
    },

    async deleteBlogger(id: number): Promise<boolean> {
        return await bloggersRepository.deleteBlogger(id)
    }

    // async findBloggerPosts(id: number) {
    //     const post: PostsType | null = await bloggersRepository.findBloggerPosts({id: id})
    //     return post
    // }

}
