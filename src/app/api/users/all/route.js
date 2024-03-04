import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";

dbConnect();

export async function GET(request) {
  try {
    const userID = request.headers.get("x-user-id");

    const allData = await Users.find({ _id: { $ne: userID } })
      .select("-password -createdAt -updatedAt -__v -lastLoginAt")
      .populate([
        { path: "following" },
        { path: "followers" },
        {
          path: "posts",
          options: { sort: { createdAt: -1 } },
        },
      ]);

    return NextResponse.json({
      message: "Successfully!",
      data: allData,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
