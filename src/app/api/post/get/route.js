import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";
import mongoose from "mongoose";

dbConnect();

export async function GET(request) {
  try {
    const loggedUserId = request.headers.get("x-user-id");
    const nextPage = parseInt(request?.nextUrl?.searchParams.get("page")) || 0;
    const pageSize = 2;
    const skipCount = nextPage * pageSize;

    const currentUser = await Users.findById(loggedUserId).exec();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const followingIds = [...currentUser.following];

    const allData = await Posts.aggregate([
      {
        $match: {
          user: {
            $in: followingIds.map((e) => new mongoose.Types.ObjectId(e)),
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          text: 1,
          createdAt: 1,
          post: 1,
          user: { _id: 1, username: 1, fullName: 1, avatar: 1 },
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
      { $skip: skipCount },
      { $limit: pageSize },
    ]).exec();

    return NextResponse.json({
      message: "Successfully!",
      data: allData,
      hasMore: allData.length === pageSize,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
