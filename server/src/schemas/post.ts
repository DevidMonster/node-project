import joi from "joi";

export const postSchema = joi.object({
  title: joi.string().required(),
  subTitle: joi.string(),
  thumbnail: joi
    .string(),
  likes: joi.string(),
  content: joi.string().required(),
});