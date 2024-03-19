import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";

dbConnect();

export async function GET(request) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    if (!loggedUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const conversation = await Conversations.find({
      participants: { $in: [loggedUserId] },
    }).populate("participants");

    return NextResponse.json({
      message: "Success",
      data: conversation,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
