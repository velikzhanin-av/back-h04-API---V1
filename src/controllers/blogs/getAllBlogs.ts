import {findAllBlogs} from "../../repositories/blogs/blogsMongoRepository";
import {Request, Response} from "express";

export const getAllBlogs = async (req: Request, res: Response) => {
    const db = await findAllBlogs()
    res
        .status(200)
        .json(db)
    return
}