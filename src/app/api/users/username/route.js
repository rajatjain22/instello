import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";

// Connect to the database
dbConnect();

export async function GET(request) {
  try {
    const userID = request.headers.get("x-user-id");
    const username = request?.nextUrl?.searchParams.get("val");

    // Validate username presence
    if (!username) {
      return NextResponse.json(
        { error: "Username is missing" },
        { status: 400 }
      );
    }

    // Find user by username
    const existingUser = await Users.findOne({
      username,
      _id: { $ne: userID },
    });

    // If user exists, return conflict error
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Username is available
    return NextResponse.json({ message: "Username is available" });
  } catch (error) {
    // Log and return internal server error
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
