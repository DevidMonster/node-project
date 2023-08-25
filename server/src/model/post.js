import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';
import mongooseDelete from 'mongoose-delete';
import slug from 'mongoose-slug-updater';

mongoose.plugin(slug)

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
    },
    thumbnail: [{
      type: String,
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    slug: {
      type: String,
      slug: 'title',
      unique: true,
    }
  },
  { timestamps: true, versionKey: false }
);

postSchema.plugin(paginate)
postSchema.plugin(mongooseDelete, {
  overrideMethods: 'all',
})

export default mongoose.model('Post', postSchema)