"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
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
        messageData,
        setMessageData,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider, MessageContext };
