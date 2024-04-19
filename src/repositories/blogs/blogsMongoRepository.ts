import {blogCollection} from "../../db/mongoDb";
import {Request} from "express";
import {ObjectId} from "mongodb";
import {BlogDbType} from "../../db/dbTypes";
import {mapToOutput} from "./blogsMongoQueryRepository";


export const createBlog = async (req: Request) => {
    const newBlog = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
        createdAt: new Date().toISOString(),
        isMembership: false
    }
    let result = await blogCollection.insertOne(newBlog)
    return mapToOutput(newBlog)
}

export const findBlogById = async (id: string) => {
    try {
        const blog = await blogCollection.findOne({_id: new ObjectId(id)})
        return mapToOutput(blog)
    } catch (err) {
        return false
    }
}

export const editBlog = async (id: string, body: any) => {
    try {
        const res = await blogCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                name: body.name,
                description: body.description,
                websiteUrl: body.websiteUrl
            }
        })
        return res.matchedCount !==0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const deleteBlog = async (id: string) => {
    try {
        const res = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}