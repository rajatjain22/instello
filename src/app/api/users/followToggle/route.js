import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { followeeId, action } = reqBody;
    const userId = request.headers.get("x-user-id");
    const followerId = userId;
    let updateQuery = "";

    if (!followeeId || !action || !userId) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        {
          status: 400,
        }
      );
    }

    if (action === "follow") {
      updateQuery = { $addToSet: { following: followeeId } };
    } else if (action === "unfollow") {
      updateQuery = { $pull: { following: followeeId } };
    } else if (action === "remove") {
      updateQuery = { $pull: { followers: followeeId } };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Update the follower's 'following' array
    await Users.findByIdAndUpdate(followerId, updateQuery).exec();

    const followeeUpdateQuery =
      action === "follow"
        ? { $addToSet: { followers: followerId } }
        : action === "unfollow"
        ? { $pull: { followers: followerId } }
        : { $pull: { following: followerId } };

    await Users.findByIdAndUpdate(followeeId, followeeUpdateQuery).exec();

    return NextResponse.json({ message: "followed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
