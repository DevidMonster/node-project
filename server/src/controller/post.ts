import { Request, Response } from "express";
import { Post } from "../Entities/Post";
import { tryCatch } from "../utils/tryCatch";
import { validate } from "../services/validate";
import { postSchema } from "../schemas/post";
import { IPost } from "../interfaces/post";
import { Comment } from "../Entities/Comment";

export const getAll = tryCatch(async (req: Request, res: Response) => {
    const posts: Post[] = await Post.find({ 
        relations: { 
            comments: true, 
            likes: true 
        } 
    })

    if(!posts || posts.length == 0) {
        res.status(404).json({
            error: "No posts found"
        })
    }

    return res.status(200).json({
        message: 'Get all results',
        posts
    })
})

export const addPost = tryCatch(async (req: Request, res: Response) => {
    const postSubmit: IPost = req.body
    const valid = validate(postSubmit, postSchema)

    if(valid) {
        await Post.insert(req.body)
    }
    return res.status(200).json({
        message: 'Add post successfully'
    })
})

export const getOne = tryCatch(async (req: Request, res: Response) => {
    const id = req.params.id as any | number
    const post: Post | null = await Post.findOne({ 
        where: { id }, 
        relations: { 
            comments: true, 
            likes: true 
        } 
    })

    if(!post) {
        res.status(404).json({
            message: 'fetch failed',
            error: "No posts found"
        })
    }

    return res.status(200).json({
        message: 'Get result',
        post
    })
})

export const patchPost = tryCatch(async (req: Request, res: Response) => {
    const postSubmit: IPost = req.body
    const id = req.params.id as any | number
    const valid = validate(postSubmit, postSchema)

    if(valid) {
        await Post.update(id, req.body)
    }
    const post = await Post.findOne({ 
        where: { id }, 
        relations: { 
            comments: true, 
            likes: true 
        } 
    })
    return res.status(200).json({
        message: 'Update post successfully',
        post
    })
})

export const removePost = tryCatch(async (req: Request, res: Response) => {
    const id = req.params.id as number | any

    const post = await Post.findOne({ 
        where: { id }, 
        relations: { 
            comments: true 
        } 
    })

    if(!post) {
        return res.status(404).json({
            message: 'No post found'
        })
    }

    for(const comment of post.comments!) {
        await Comment.remove(comment)
    }

    await Post.remove(post)

    return res.status(200).json({
        message: 'Remove post successfully'
    })
})