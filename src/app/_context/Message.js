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

  const [allConversations, setAllConversations] = useState([]);
  const [messageData, setMessageData] = useState({});
  const [userData, setUserData] = useState({});

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
    const handleNewFriendRequest = (data) => {
      toast.custom((t) => (
        <CustomToast id={t.id} visible={t.visible} data={data} />
      ));
    };

    const handleSendMessage = (data, type) => {
      console.log("data", data);
      const getMessageId = type === "send" ? data.receiverId : data.senderId;
      setMessageData((prevState) => {
        const updateState = { ...prevState };
        const messageArray = updateState[getMessageId] || [];

        const existingMessageIndex = messageArray.findIndex(
          (e) => e.newKey === data.newKey
        );

        if (existingMessageIndex !== -1) {
          // Update existing message
          messageArray[existingMessageIndex] = {
            ...messageArray[existingMessageIndex],
            conversationId: data.conversationId,
            status: data.status,
            _id: data._id,
            file: data.file,
          };
        } else {
          // Add new message
          messageArray.push(data);
        }
        updateState[getMessageId] = messageArray;
        return updateState;
      });

      setAllConversations((prevConversations) => {
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
                : updatedConversations[findConversationIndex]?.unreadCount || 0,
          };
          const currentConversation = updatedConversations.splice(
            findConversationIndex,
            1
          )[0];
          updatedConversations.unshift(currentConversation);
        } else {
          updatedConversations.unshift({
            id: data.conversationId,
            user_id: getMessageId,
            username: data.username,
            avatar: data.avatar,
            lastMessage: data.text,
            lastMessageType: data.type,
            unreadCount: type === "receive" ? 1 : 0,
            lastMessageCreatedAt: new Date(),
          });
        }
        return updatedConversations;
      });
    };

    socket?.on("new_friend_request", handleNewFriendRequest);
    socket?.on("send_new_message", (data) => handleSendMessage(data, "send"));
    socket?.on("receive_new_message", (data) =>
      handleSendMessage(data, "receive")
    );

    return () => {
      console.log("Cleaning up event listeners");
      socket?.off("new_friend_request");
      socket?.off("send_new_message");
      socket?.off("receive_new_message");
    };
  }, [socket]);

  console.log("a;;;;,;;dk", allConversations);
  return (
    <MessageContext.Provider
      value={{
        socket,
        allConversations,
        setAllConversations,
        messageData,
        setMessageData,
        userData,
        setUserData,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider, MessageContext };
