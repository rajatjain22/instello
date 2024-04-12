import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";
import mongoose from "mongoose";
import Comments from "@/schemas/CommetModel";

dbConnect();

export async function DELETE(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    const postId = params.postId;

    // Check if postId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json({ error: "Invalid postId" }, { status: 400 });
    }

    // Check if post exists
    const post = await Posts.findOne({ _id: postId, user: loggedUserId });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Check if the logged user is the owner of the post
    if (post.user.toString() !== loggedUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Delete the post
    await Posts.deleteOne({ _id: postId });

    await Users.findByIdAndUpdate(
      { _id: loggedUserId },
      {
        $pull: { posts: postId },
      }
    ).exec();

    await Comments.deleteMany({ post: postId });

    return NextResponse.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
