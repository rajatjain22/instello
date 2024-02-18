import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    text: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comments' }],
    post: [{ type: String }], // Array to store image URLs
    reel: [{ type: String }], // Array to store video URLs
    createdAt: { type: Date, default: Date.now },
});
  
const Posts = mongoose.models.posts || mongoose.model("posts", PostSchema);

export default Posts;