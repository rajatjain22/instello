import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import mongoose from "mongoose";

// Connect to the database
dbConnect();

export async function GET(request) {
  try {
    const userID = request.headers.get("x-user-id");

    // Check if userID is provided
    if (!userID) {
      throw new Error("User ID is missing in the request headers.");
    }

    // Fetch user document of the current user
    const user = await Users.findById(userID);

    // Check if user document exists
    if (!user) {
      throw new Error("User not found.");
    }

    const followingIds = user.following.map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    // Perform aggregation
    const allData = await Users.aggregate([
      {
        $match: {
          $and: [
            { _id: { $ne: new mongoose.Types.ObjectId(userID) } }, // Exclude the current user
            { _id: { $nin: followingIds } }, // Exclude users already being followed
          ],
        },
      },
      {
        $project: {
          _id: 1,
          avatar: 1,
          followed_by_viewer: { $literal: false },
          follows_viewer: { $literal: false },
          fullName: 1,
          username: 1,
        },
      },
      {
        $limit: 5, // Limit the result to 10 documents
      },
    ]);

    // Return response
    return NextResponse.json({
      message: "Success",
      data: allData,
    });
  } catch (error) {
    // Log error
    console.error("Error:", error);

    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
