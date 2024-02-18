import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";

dbConnect();

export async function GET(request) {
  try {
    const userID = request.headers.get("x-user-id");

    const currentUser = await Users.findById(userID).exec();

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const followingIds = [...currentUser.following];

    const allData = await Posts.find({ user: { $in: followingIds } })
      .select("-__v")
      .sort('-createdAt')
      .populate({
        path: "user",
        select: "-__v -password -updatedAt -lastLoginAt",
      })
      .exec();

    return NextResponse.json({
      message: "Successfully!",
      data: allData,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
