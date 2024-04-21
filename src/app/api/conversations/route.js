import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";

dbConnect();

export async function GET(request) {
  const loggedUserId = request.headers.get("x-user-id");
  const userId = request?.nextUrl?.searchParams.get("q");

  try {
    if (!loggedUserId || !userId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    const conversation = await Conversations.findOne({
      participants: { $all: [loggedUserId, userId] },
    }).select("_id lastReadMessage");

    return NextResponse.json({
      message: "Success",
      conversation,
      id: conversation._id,

    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
