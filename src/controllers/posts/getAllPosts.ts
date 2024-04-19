import {Request, Response} from "express";
import {findAllPosts} from "../../repositories/posts/postsMongoRepository";


export const getAllPosts = async (req: Request, res: Response) => {
    const db = await findAllPosts()
    res
        .status(200)
        .json(db)
}