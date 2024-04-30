import {Request, Response} from "express"
import {findPostsByBlogId} from "../../repositories/blogs/blogsMongoQueryRepository";

export const getPostsByBlogId = async (req: Request, res: Response) => {
    const posts = await findPostsByBlogId(req.params.blogId, req.query)
    console.log(posts)
    if (!posts) {
        res
            .sendStatus(404)
        return
    }
    res
        .status(200)
        .json(posts)
}