import {ObjectId} from "mongodb";

export type BlogDbType = {
    _id?: ObjectId
    name: string
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type BlogDbTypeWithoutId = {
    name: string
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: boolean
}

export type PostDbType = {
    _id: ObjectId
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}

export type PostDbTypeWithoutId = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: string
}
