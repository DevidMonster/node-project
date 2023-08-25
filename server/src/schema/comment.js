import joi from 'joi';

export const commentSchema = joi.object({
    userId: joi.string().required(),
    postId: joi.string().required(),
    content: joi.string().required(),
})