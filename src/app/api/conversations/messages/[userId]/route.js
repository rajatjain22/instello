import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";
import Users from "@/schemas/UserModel";

dbConnect(); // Ensures a connection to the database

export async function GET(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  const { userId } = params;

  const conversationId = request?.nextUrl?.searchParams.get("q");
  const nextPage = parseInt(request?.nextUrl?.searchParams.get("page")) || 0;

  const pageSize = 100;
  const skipCount = nextPage * pageSize;

  if (conversationId) {
    return NextResponse.json({
      message: "Success",
      conversationId,
    });
  }

  if (!loggedUserId || !userId) {
    return NextResponse.json({ error: "user ID is missing." }, { status: 400 });
  }

  try {
    const existingConversation = await Conversations.findOne({
      participants: { $all: [loggedUserId, userId], $size: 2 },
    })
      .populate("participants", "username fullName avatar status lastLoginAt")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: pageSize },
      });

    if (existingConversation) {
      const user = existingConversation.participants.find(
        (participant) => participant._id.toString() === userId
      );

      return NextResponse.json({
        message: "Success",
        user,
        messages: existingConversation.messages.reverse() || [],
        lastReadMessage: existingConversation.lastReadMessage,
        hasMore: pageSize === existingConversation.messages.length,
      });
    }

    // If no conversation is found, fetch user details
    const user = await Users.findById(userId).select(
      "username fullName avatar status"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "No conversation found, but user details retrieved.",
      user,
      messages: [],
    });
  } catch (error) {
    console.error("An error occurred while fetching the conversation:", error);
    return NextResponse.json(
      { error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}
