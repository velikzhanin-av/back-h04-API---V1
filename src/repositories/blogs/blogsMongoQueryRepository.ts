import {blogCollection} from "../../db/mongoDb";
import {BlogDbType} from "../../db/dbTypes";
import {SortDirection} from "mongodb";
import {Request} from "express";

export const mapToOutput = (blog: any) => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

const helper = (query: any) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
    }
}

export const findAllBlogs = async (query: any) => {
    const params = helper(query)
    let res = await blogCollection
        .find()
        .skip(params.pageNumber)
        .limit(params.pageSize)
        .sort(params.sortBy, params.sortDirection).toArray()
    return res.map((blog: BlogDbType) => {
        return mapToOutput(blog)
    })
}