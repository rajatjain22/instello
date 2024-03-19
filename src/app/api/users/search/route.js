import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

dbConnect();
export async function POST(request) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    const reqBody = await request.json();
    const searchValue = reqBody?.search?.toLowerCase();

    if (!searchValue) {
      return NextResponse.json(
        { error: "Please search correct value!" },
        {
          status: 400,
        }
      );
    }

    // $or operator to perform a search with multiple criteria. Each condition within the $or array represents a separate search criterion.
    const query = {
      $or: [
        { fullName: { $regex: searchValue, $options: "i" } },
        // { email: { $regex: searchValue, $options: "i" } },
        { username: { $regex: searchValue, $options: "i" } },
      ],
    };

    // const users = await Users.find(query).select("_id fullName username");

    const allData = await Users.aggregate([
      {
        $match: query,
      },
      {
        $project: {
          _id: 1,
          avatar: 1,
          followed_by_viewer: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(loggedUserId), "$followers"],
              },
              then: true,
              else: false,
            },
          },
          follows_viewer: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(loggedUserId), "$following"],
              },
              then: true,
              else: false,
            },
          },
          fullName: 1,
          username: 1,
        },
      },
      {
        $limit: 5, // Limit the result to 10 documents
      },
    ]);

    return NextResponse.json({ message: "Successfully", users: allData });
  } catch (error) {
    // console.error("Error while registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
