import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";
import Comments from "@/schemas/CommetModel";
import { IoConstructOutline } from "react-icons/io5";


dbConnect();

export async function GET(request, { params }) {
  try {
    const { postId } = params;
    const nextPage = parseInt(request?.nextUrl?.searchParams.get("page")) || 0;

    const pageSize = 10;
    const skipCount = nextPage * pageSize;

    // Validate postId
    if (!postId) {
      return NextResponse.json(
        { error: "Post ID is missing" },
        { status: 400 }
      );
    }

    // Retrieve comments for the specified post
    const comments = await Comments.find({ post: postId }, { likes: 0, __v: 0 })
      .populate({
        path: "user",
        options: { select: "_id username fullName avatar" },
      })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(skipCount)
      .lean()
      .exec();

    // const updatedComments = comments.map((comment) => ({
    //   ...comment,
    //   likesCount: comment.likes.length,
    // }));

    // Return comments
    return NextResponse.json({
      message: "Comments retrieved",
      data: comments,
      hasMore: comments.length === pageSize,
    });
  } catch (error) {
    console.error("Error retrieving comments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    const { postId } = params;
    const reqBody = await request.json();

    // Validate request body
    if (!reqBody || !reqBody.comment) {
      return NextResponse.json(
        { error: "Comment cannot be empty" },
        { status: 400 }
      );
    }

    const { comment } = reqBody;

    // Check if the post exists
    const post = await Posts.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Create a new comment
    const newComment = new Comments({
      post: postId,
      user: loggedUserId,
      comment,
    });

    await newComment.save().then((data) => {
      return Posts.updateOne(
        { _id: postId },
        { $push: { comments: data._id } }
      );
    });

    return NextResponse.json({
      message: "Comment created",
      id: newComment._id,
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
