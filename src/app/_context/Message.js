"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";

import { io } from "socket.io-client";
import { CustomToast } from "@/components/common/CustomToast";
import toast from "react-hot-toast";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
  const { userDetails } = useContext(UserContext);
  const [conversationId, setConversationId] = useState("new");
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messageData, setMessageData] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let socketData = null;
    if (userDetails?._id) {
      socketData = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
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
  }, [userDetails]);

  useEffect(() => {
    if (socket) {
      socket.on("new_friend_request", (data) => {
        toast.custom((t) => (
          <CustomToast id={t.id} visible={t.visible} data={data} />
        ));
      });

      const handleMessage = (data, type) => {
        if (!data.conversationId) return;

        conversationId === "new" && setConversationId(data.conversationId);

        // Update message data
        setMessageData((prevState) => ({
          ...prevState,
          [data.conversationId]: [
            ...(prevState?.[data?.conversationId] || []),
            data,
          ],
        }));

        setConversations((prevConversations) => {
          let updatedConversations = [...prevConversations];
          const findConversationIndex = updatedConversations.findIndex(
            (e) => e.id === data.conversationId
          );

          if (findConversationIndex !== -1) {
            updatedConversations[findConversationIndex] = {
              ...updatedConversations[findConversationIndex],
              lastMessage: data.text,
              lastMessageCreatedAt: new Date(),
              unreadCount:
                type === "receive"
                  ? (updatedConversations[findConversationIndex]?.unreadCount ||
                      0) + 1
                  : updatedConversations[findConversationIndex]?.unreadCount ||
                    0,
            };
            const currentConversation = updatedConversations.splice(
              findConversationIndex,
              1
            )[0];
            updatedConversations.unshift(currentConversation);
          } else {
            updatedConversations.unshift({
              id: data.conversationId,
              user_id: data.receiverId,
              username: data.username,
              avatar: data.avatar,
              lastMessage: data.text,
              lastMessageCreatedAt: new Date(),
            });
          }
          return updatedConversations;
        });
      };

      socket.on("send_new_message", (data) => handleMessage(data, "send"));
      socket.on("receive_new_message", (data) =>
        handleMessage(data, "receive")
      );

      return () => {
        socket.off("new_friend_request");
        socket.off("send_new_message");
        socket.off("receive_new_message");
      };
    }
  }, [userDetails, conversationId, socket]);

  const path = usePathname();
  const [conversationId, setConversationId] = useState("new");
  const [conversations, setConversations] = useState([]);
  const [messageData, setMessageData] = useState(null);

  const { socket, userDetails } = useContext(UserContext);

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/forget-password";

  useEffect(() => {
    socket?.emit(
      "get_conversations",
      { userId: userDetails._id },
      (conversations) => {

        const list = conversations.map((el) => {
          const user = el.participants.find(
            (elm) => elm._id.toString() !== userDetails._id
          );
          return {
            id: el._id,
            user_id: user?._id,
            username: `${user?.username}`,
            avatar: `${user?.avatar}`,
          };
        });

        setConversations([...list]);
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
        setConversationsLoading,
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
