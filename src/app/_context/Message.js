"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";
import { connectSocket, socketData } from "@/helpers/socket";
import { io } from "socket.io-client";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
  const path = usePathname();
  const { userDetails } = useContext(UserContext);
  const [conversationId, setConversationId] = useState("new");
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messageData, setMessageData] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketData = null;
    if (userDetails?._id) {
      const socketData = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
        query: `user_id=${userDetails?._id}`,
      });

      socketData.on("connect", () => {
        console.log("Socket connected");
        setSocket(socketData);
      });

      socketData.on("getUsers", (users) => {
        console.log("Active users:", users);
      });
    }

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      if (socketData) {
        console.log("Socket disconnected");
        socketData.disconnect();
      }
    };
  }, [userDetails]);

  useEffect(() => {
    socket?.emit(
      "get_conversations",
      { userId: userDetails._id },
      (conversations) => {
        console.log("conversations ===>", conversations);
        setConversationsLoading(true);
        const list = conversations.map((el) => {
          const user = el.participants.find(
            (elm) => elm._id.toString() !== userDetails._id
          );
          return {
            id: el._id,
            user_id: user?._id,
            username: user?.username,
            avatar: user?.avatar,
            lastMessage: el?.lastMessage,
            status: user?.status,
            lastMessageCreatedAt: el?.lastMessageCreatedAt,
          };
        });

        setConversations([...list]);
        setConversationsLoading(false);
      }
    );

    socket?.on("send_new_message", (data) => {
      if (!data.conversationId) return;
      conversationId === "new" && setConversationId(data.conversationId);
      setMessageData((prevState) => ({
        ...prevState,
        [data.conversationId]: [
          ...(prevState?.[data?.conversationId] || []),
          data,
        ],
      }));

      setConversations((presVal) => {
        let presConversations = [...presVal];
        const findConversationIndex = presConversations.findIndex(
          (e) => e.id === data.conversationId
        );

        if (findConversationIndex !== -1) {
          presConversations[findConversationIndex].lastMessage = data.text;
          presConversations[findConversationIndex].lastMessageCreatedAt =
            new Date();
        } else {
          presConversations.unshift({
            id: data.conversationId,
            user_id: data.receiverId,
            username: data.username,
            avatar: data.avatar,
            lastMessage: data.text,
            lastMessageCreatedAt: new Date(),
          });
        }
        return presConversations;
      });
    });

    socket?.on("receive_new_message", (data) => {
      if (!data.conversationId) return;
      setMessageData((prevState) => ({
        ...prevState,
        [data.conversationId]: [
          ...(prevState?.[data?.conversationId] || []),
          data,
        ],
      }));

      setConversations((presVal) => {
        let presConversations = [...presVal];
        const findConversationIndex = presConversations.findIndex(
          (e) => e.id === data.conversationId
        );

        if (findConversationIndex !== -1) {
          presConversations[findConversationIndex].lastMessage = data.text;
          presConversations[findConversationIndex].lastMessageCreatedAt =
            new Date();
        } else {
          presConversations.unshift({
            id: data.conversationId,
            user_id: data.receiverId,
            username: data.username,
            avatar: data.avatar,
            lastMessage: data.text,
            lastMessageCreatedAt: new Date(),
          });
        }
        return presConversations;
      });
    });
  }, [socket]);

  return (
    <MessageContext.Provider
      value={{
        conversationId,
        setConversationId,
        conversations,
        setConversations,
        conversationsLoading,
        messageData,
        setMessageData,
        socket,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider, MessageContext };
