import {blogCollection, postCollection} from "../../db/mongoDb";
import {BlogDbType, PostDbType} from "../../db/dbTypes";
import {SortDirection} from "mongodb";
import {mapToOutputPosts} from "../posts/postsMongoRepository";

export const mapToOutputBlogs = (blog: any) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const helper = (query: any) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}

export const findAllBlogs = async (query: any) => {
    const params: any = helper(query)
    const filter = searchNameTerm(params.searchNameTerm)
    let blogs: BlogDbType[] = await getBlogsFromBD(params, filter)
    const totalCount: number = await getTotalCount(filter)
    return {
        pageCount: Math.ceil(totalCount / params.pageSize),
        page: params.pageNumber,
        pageSize: params.pageSize,
        totalCount: totalCount,
        items: blogs.map((blog: BlogDbType) => {
            return mapToOutputBlogs(blog)
        })
    }
}

const getBlogsFromBD = async (params: any, filter: any) => {
    return await blogCollection
        .find(filter)
        .skip(params.pageNumber)
        .limit(params.pageSize)
        .sort(params.sortBy, params.sortDirection).toArray()
}

export const getTotalCount = async (filter: any) => {
    return await blogCollection.countDocuments(filter)
}

const searchNameTerm = (searchNameTerm: any) => {
    const search = searchNameTerm
        ? {name: {$regex: searchNameTerm, $options: 'i'}}
        : {}
    return {
        ...search,
    }
}

export const findPostsByBlogId = async (id: string, query: any) => {
    const params = helper(query)
    console.log(params)
    const filter = {blogId: id}
    const totalCount: number = await getTotalCount(filter)
    if (!totalCount) {
        return
    }
    const posts: PostDbType[] = await postCollection
        .find(filter).toArray()
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

