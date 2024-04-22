import {BlogDbType, PostDbType} from "../../db/dbTypes";
import {getTotalCount, helper, mapToOutputBlogs} from "../blogs/blogsMongoQueryRepository";
import {mapToOutputPosts} from "./postsMongoRepository";
import {blogCollection, postCollection} from "../../db/mongoDb";

export const findAllPosts = async (query: any) => {
    const params: any = helper(query)
    const filter: any = {}
    let posts: PostDbType[] = await getPostsFromBD(params, filter)
    const totalCount: number = await getTotalCount(filter)
    return {
        pageCount: Math.ceil(totalCount / params.pageSize),
        page: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: totalCount,
        items: posts.map((post: PostDbType) => {
            return mapToOutputPosts(post)
        })
    }
}

const getPostsFromBD = async (params: any, filter: any) => {
    return await postCollection
        .find(filter)
        .skip(params.pageNumber)
        .limit(params.pageSize)
        .sort(params.sortBy, params.sortDirection).toArray()
}
