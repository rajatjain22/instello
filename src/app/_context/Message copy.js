"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";
import { io } from "socket.io-client";
import { CustomToast } from "@/components/common/CustomToast";
import toast from "react-hot-toast";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
  const path = usePathname();
  const { userDetails } = useContext(UserContext);
  let [conversationId, setConversationId] = useState("new");
  const [conversations, setConversations] = useState([]);
  const [conversationsLoading, setConversationsLoading] = useState(true);
  const [messageData, setMessageData] = useState({});
  const [notSendMessage, setNotSendMessage] = useState({});
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log("Message context running");

    if (!userDetails?._id) {
      return;
    }

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

    return () => {
      socketData.disconnect();
    };
  }, [userDetails]);

  useEffect(() => {
    if (socket && socket.connected) {
      console.log("Socket is connected. Setting up event listeners.");

      socket.on("new_friend_request", (data) => {
        toast.custom((t) => (
          <CustomToast id={t.id} visible={t.visible} data={data} />
        ));
      });

      const handleMessage = (data, type) => {
        if (!data.conversationId) {
          console.warn("No conversationId in data");
          return;
        }

        if (conversationId === "new") {
          setConversationId(data.conversationId);
        }

        // Update message data
        setMessageData((prevState) => {
          const conversationId = data.conversationId;

          const prevMessages = prevState[conversationId] || [];

          const updatedMessages = [...prevMessages, data];

          return {
            ...prevState,
            [conversationId]: updatedMessages,
          };
        });

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
              lastMessageType: data.type,
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
        console.log("Cleaning up event listeners");
        socket.off("new_friend_request");
        socket.off("send_new_message");
        socket.off("receive_new_message");
      };
    } else {
      console.warn("Socket is not connected. Cannot set event listeners.");
    }
  }, [userDetails, conversationId, socket]);

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
        notSendMessage,
        setNotSendMessage,
        socket,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider, MessageContext };
