import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Messages from "@/schemas/MessageModel";

dbConnect();

export async function GET(request, { params: { conversationId } }) {
  try {
    if (!conversationId) {
      return NextResponse.json(
        { error: "ConversationId not found" },
        { status: 400 }
      );
    }

    const data = await Messages.find({ conversationId })
      .populate("senderId")
      .limit(10)
      .sort({ createdAt: -1 });

    return NextResponse.json({
      message: "Success",
      data: data,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
