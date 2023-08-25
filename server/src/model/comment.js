import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const commentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    content: {
        type: String,
        required: true
    },
}, 
{ timestamps: true, versionKey: false })

commentSchema.plugin(paginate)

export default mongoose.model('Comment', commentSchema)