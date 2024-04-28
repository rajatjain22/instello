import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import Conversations from "@/schemas/ConversationModel";
import mongoose from "mongoose";
import Messages from "@/schemas/MessageModel";

dbConnect();

const getUnreadMessageCount = async (conversationId, lastReadMessage) => {
  try {
    if (!lastReadMessage) {
      return await Messages.countDocuments({ conversationId });
    }

    return await Messages.countDocuments({
      conversationId,
      createdAt: { $gt: lastReadMessage.createdAt },
    });
  } catch (error) {
    console.error("Error in getUnreadMessageCount:", error);
    throw error;
  }
};

export async function GET(request) {
  const loggedUserId = request.headers.get("x-user-id");

  try {
    if (!loggedUserId) {
      return NextResponse.json(
        { error: "User ID not provided" },
        { status: 400 }
      );
    }

    const existing_conversations = await Conversations.find({
      participants: { $in: [loggedUserId] },
    })
      .populate("participants", "username avatar status")
      .populate("lastMessage")
      .populate("lastReadMessage")
      .sort({ lastMessageCreatedAt: -1 })
      .exec();

    const data = await Promise.all(
      existing_conversations.map(async (el) => {
        const user = el.participants.find(
          (elm) => elm._id.toString() !== loggedUserId
        );

        const unreadCount =
          loggedUserId === el?.lastMessage?.senderId?.toString()
            ? 0
            : await getUnreadMessageCount(el._id, el?.lastReadMessage);

        return {
          id: el._id,
          user_id: user?._id,
          username: user?.username,
          avatar: user?.avatar,
          lastMessage: el?.lastMessage?.text,
          status: user?.status,
          lastMessageType: el?.lastMessage?.type,
          lastMessageCreatedAt: el?.lastMessage?.createdAt ?? "",
          unreadCount,
        };
      })
    );

    return NextResponse.json({
      message: "Success",
      data,
    });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
