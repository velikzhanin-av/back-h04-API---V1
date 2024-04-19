import {blogCollection, postCollection} from "../../db/mongoDb";
import {ObjectId} from "mongodb";
import {PostDbType} from "../../db/dbTypes";
import {db} from "../../db/db";
import {Request} from "express";

const mapToOutput = (post: any) => {  //проверить позже с типом
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const findAllPosts = async () => {
    let res = await postCollection.find().toArray()
    return res.map((post: PostDbType) => {
        return mapToOutput(post)
    })
}

export const createPost = async (req: Request) => {
    const newPost =
        {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: "string",
            createdAt: new Date().toISOString()
        }
    let result = await postCollection.insertOne(newPost)
    console.log(newPost) // проверить позже
    return mapToOutput(newPost)
}

export const findPostById = async (id: string) => {
    try {
        const post = await postCollection.findOne({_id: new ObjectId(id)})
        return mapToOutput(post)
    } catch (err) {
        return false
    }
}

export const editPost = async (id: string, body: any) => {
    try {
        const res = await postCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                title: body.title,
                shortDescription: body.shortDescription,
                content: body.content,
                blogId: body.blogId
            }
        })
        return res.matchedCount !==0
    } catch (err) {
        console.log(err)
        return false
    }
}

export const deletePost = async (id: string) => {
    try {
        const res = await postCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount !== 0
    } catch (err) {
        console.log(err)
        return false
    }
}