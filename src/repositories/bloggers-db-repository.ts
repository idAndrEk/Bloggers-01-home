import {promises} from "dns";
import {bloggersCollection, postCollection} from "./db";
import {Filter, ObjectId} from "mongodb";
import {BloggerPayloadType, BloggersResponseType, PaginationType} from "../types/bloggersTypes";

export const bloggersRepository = {
    // async forCount(name: string | null): Promise<number> {
    //     let filter: Filter<BloggersResponseType> = {}
    //     if (name) {
    //         filter = {$regex: {name}}
    //     }
    //     return bloggersCollection.count(filter)
    // },

    async allBloggers(page: number, pageSize: number, name: string | null): Promise<PaginationType<BloggersResponseType> | null> {
        let filter = {}
        if (name) {
            console.log(name, 'name')
            filter = {name: {$regex: `.*${name}.*`}}
        }
        const skip = (page - 1) * pageSize
        let allBloggersCount = await bloggersCollection.count(filter)
        let pagesCount = allBloggersCount / pageSize
        let bloggers = await bloggersCollection.find(filter).skip(skip).limit(pageSize).toArray()
        return {
            pagesCount: Math.ceil(pagesCount),
            page: page,
            pageSize: pageSize,
            totalCount: allBloggersCount,
            items: bloggers.map(blogger => ({
                youtubeUrl: blogger.youtubeUrl,
                // id: blogger._id.toString(),
                id: blogger.id,
                name: blogger.name
            }))
        }
    },

    // async findBloggersName(name: string | null)/*: Promise<BloggersType | null>*/ {
    //     const filter = {} as { name: { $regex: string } }
    //     if (name) {
    //         filter.name = {$regex: name}
    //         return await bloggersCollection.findOne(filter)
    //     }
    // },

    async findBloggerById(id: number): Promise<BloggersResponseType | null> {
        // const blogger = await bloggersCollection.findOne({ _id: new ObjectId(id) });
        const blogger = await bloggersCollection.findOne({id: id});
        if (!blogger) {
            return null
        }

        // return {id: blogger._id.toString(), name: blogger.name, youtubeUrl: blogger.youtubeUrl}
        return {id: blogger.id, name: blogger.name, youtubeUrl: blogger.youtubeUrl}
    },

    // async createBlogger(newBlogger: BloggerPayloadType): Promise<BloggersResponseType | null> {
    async createBlogger(newBlogger: BloggersResponseType): Promise<BloggersResponseType | null> {
        const {
            youtubeUrl,
            name
        } = newBlogger
        const result = await bloggersCollection.insertOne(newBlogger);
        if (!result.acknowledged) {
            return null
        }
        return {
            name,
            youtubeUrl,
            // id: result.insertedId.toString()
            id: newBlogger.id
        }
    },

    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection.updateOne({id: id}, {
            $set: {
                name: name,
                youtubeUrl: youtubeUrl
            }
        })
        return result.matchedCount === 1
    },

    async deleteBlogger(id: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },

    async findBloggerPosts(bloggerId: number | null, page: number, pageSize: number): Promise<any> {
        let filter = {}
        if (bloggerId) {
            filter = {bloggerId}
        }
        const skip = (page - 1) * pageSize
        let allPostsCount = await postCollection.count(filter)
        let pagesCount = allPostsCount / pageSize
        let posts = await postCollection.find(filter).skip(skip).limit(pageSize).toArray()
        // let allCount = await postCollection.count({})
        return {
            pagesCount: Math.ceil(pagesCount),
            page: page,
            pageSize: pageSize,
            totalCount: allPostsCount,
            items: posts.map(post => ({
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                bloggerId: post.bloggerId,
                bloggerName: post.bloggerName
            }))
        }
    }
}

// async function getQuery() {
//     let query = await db.collection.find({}).skip(5).limit(5);
//     let countTotal = await query.count()
//     let countWithConstraints = await query.count(true)
//     return { query, countTotal }
// }
//
// const page = parseInt(req.query.page);
// const userService = new userService();
// const users = await userService.getAll(page);
// getAll(page = 1) {
//     const PAGE_SIZE = 20;
//     const skip = (page - 1) * PAGE_SIZE;
//     return UsersModel.aggregate([
//         { $match: {} },
//         { $skip: (page - 1) * PAGE_SIZE },
//         { $limit: PAGE_SIZE },
//     ])
// }


// async allBloggers(page: number, pageSize: number, filter: object, idBlogger?: object): Promise<any> {
//     let idBloggerObj = {
//         projection: {
//             _id: false,
//             ...idBlogger
//         }
//     }
//     const skip = (page - 1) * pageSize
//     let allBloggers = await bloggersCollection.find({}).toArray()
//     let pagesCount = allBloggers.length / pageSize
//     let bloggers = await bloggersCollection.find(filter, idBloggerObj).skip(skip).limit(pageSize).toArray()
//     let allCount = await bloggersCollection.count({})