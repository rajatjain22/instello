import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";
import Messages from "@/schemas/MessageModel";
import { NextResponse } from "next/server";

dbConnect();

export async function POST(request) {
  try {
    const { conversationId, senderId, receiverId, message } =
      await request.json();

    let conversation = "";

    if (!senderId || !message) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        { status: 400 }
      );
    }

    if (conversationId === "new" && receiverId) {
      const newConversation = new Conversations({
        participants: [senderId, receiverId],
      });
      await newConversation.save();

      conversation = newConversation;
    } else {
      conversation = await Conversations.findById(conversationId);
      if (!conversation) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
    }

    const newMessage = new Messages({
      conversationId: conversation._id,
      senderId,
      message,
    });
    await newMessage.save();
    return NextResponse.json(
      {
        message: "Message send",
        conversationId: conversation._id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
