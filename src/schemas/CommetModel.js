import mongoose from "mongoose";

const { Schema } = mongoose;

const PostCommentSchema = new Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comments =
  mongoose.models.comments || mongoose.model("comments", PostCommentSchema);

export default Comments;
