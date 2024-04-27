import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";
import Users from "@/schemas/UserModel";

dbConnect(); // Ensures a connection to the database

export async function GET(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id"); // Retrieving logged user ID
  const { userId } = params; // Retrieving the userId parameter from URL params

  // Error handling: check if required IDs are provided
  if (!loggedUserId) {
    return NextResponse.json(
      { error: "Logged user ID is missing from request headers." },
      { status: 400 }
    );
  }

  if (!userId) {
    return NextResponse.json(
      { error: "User ID parameter is missing." },
      { status: 400 }
    );
  }

  try {
    const existingConversation = await Conversations.findOne({
      participants: { $all: [loggedUserId, userId], $size: 2 },
    })
      .populate("participants", "username fullName avatar status")
      .populate("messages");

    if (existingConversation) {
      const user = existingConversation.participants.find(
        (participant) => participant._id.toString() === userId
      );

      return NextResponse.json({
        message: "Success",
        user,
        messages: existingConversation.messages || [],
        lastReadMessage: existingConversation.lastReadMessage,
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
