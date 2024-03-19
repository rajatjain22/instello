import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";
import mongoose from "mongoose";

dbConnect();

export async function GET(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    const query = params.userId;

    const userId = query === "user" ? loggedUserId : query;
    const data = await Posts.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          createdAt: 1,
          post: 1,
          hasLiked: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(loggedUserId), "$likes"],
              },
              then: true,
              else: false,
            },
          },
          likesCount: { $size: "$likes" },
          commentCount: { $size: "$comments" },
          mediaCount: { $size: "$post" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]).exec();

    return NextResponse.json({
      message: "Successfully!",
      data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
