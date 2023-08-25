import joi from "joi";

export const postSchema = joi.object({
  title: joi.string().required(),
  thumbnail: joi
    .array()
    .items(
      joi.string()
    ),
  subTitle: joi.string(),
  likes: joi.array().items(joi.string()),
  content: joi.string().required(),
  comments: joi.array().items(joi.string()),
});
