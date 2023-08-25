import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    avatar: [
        {
          type: String,
          default: "https://res.cloudinary.com/dpwto5xyv/image/upload/v1692587346/learnECMAS/t%E1%BA%A3i_xu%E1%BB%91ng_zdwt9p.png"
        },
      ],
    role: {
      type: String,
      enum: ["admin", "contributor","member"],
      default: "member",
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.plugin(paginate)

export default mongoose.model("User", userSchema);
