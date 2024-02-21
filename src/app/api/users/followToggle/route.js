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

    console.log(action);

    if (!followeeId || !action || !userId) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        {
          status: 400,
        }
      );
    }
    if (action === "confirm") {
      await Users.findByIdAndUpdate(followerId, {
        $addToSet: { followers: followeeId },
        $pull: { followRequest: followeeId },
      }).exec();

      await Users.findByIdAndUpdate(followeeId, {
        $addToSet: { following: followerId },
      }).exec();
    } else {
      if (action === "follow") {
        updateQuery = { $addToSet: { following: followeeId } };
      } else if (action === "unfollow") {
        updateQuery = { $pull: { following: followeeId } };
      }

      // Update the follower's 'following' array
      await Users.findByIdAndUpdate(followerId, updateQuery).exec();

      let followeeUpdateQuery = {};
      if (action === "follow") {
        followeeUpdateQuery = { $addToSet: { followers: followerId } };
      } else if (action === "unfollow") {
        followeeUpdateQuery = { $pull: { followers: followerId } };
      } else if (action === "request") {
        followeeUpdateQuery = { $addToSet: { followRequest: followerId } };
      } else if (action === "unrequest") {
        followeeUpdateQuery = { $pull: { followRequest: followerId } };
      }

      await Users.findByIdAndUpdate(followeeId, followeeUpdateQuery).exec();
    }
    return NextResponse.json({ message: "followed" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
