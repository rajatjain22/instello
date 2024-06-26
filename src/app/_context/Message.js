"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./User";
import { io } from "socket.io-client";
import { CustomToast } from "@/components/common/CustomToast";
import toast from "react-hot-toast";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
  const { userDetails } = useContext(UserContext);

  const [allConversations, setAllConversations] = useState([]);
  const [allConversationsLoading, setAllConversationsLoading] = useState(false);
  const [messageData, setMessageData] = useState({});
  const [userData, setUserData] = useState({});

  const [socket, setSocket] = useState(null);

  const fetchData = async () => {
    try {
      setAllConversationsLoading(true);
      const res = await fetch("/api/conversations");
      const data = await res.json();
      setAllConversations(data.data);
      setAllConversationsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userDetails?._id) {
      return;
    }

    console.log("Message context running");

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

    fetchData();

    return () => {
      socketData.disconnect();
    };
  }, [userDetails]);

  useEffect(() => {
    if (!socket) return;

    const handleNewFriendRequest = (data) => {
      toast.custom((t) => (
        <CustomToast id={t.id} visible={t.visible} data={data} />
      ));
      if (Notification.permission === "granted") {
        new Notification(data.username, {
          body: data.message,
          icon: data.avatar,
        });
      } else {
        console.warn("Notification permission not granted");
      }
    };

    const handleSendMessage = (data, type) => {
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

      if (type === "receive") {
        if (Notification.permission === "granted") {
          new Notification(data.username, {
            body: data.type === "media" ? "Media" : data.text,
            icon: data.avatar,
          });
        } else {
          console.warn("Notification permission not granted");
        }
      }
    };

    const handleUserTyping = (userId, typing) => {
      const indexConvo = allConversations.findIndex(
        (e) => e.user_id === userId
      );
      if (indexConvo >= 0) {
        setAllConversations((prevState) => {
          const newConversations = [...prevState];

          newConversations[indexConvo] = {
            ...newConversations[indexConvo],
            typing,
          };

          return newConversations;
        });
      }
    };

    const handleUserOnline = (userId, status) => {
      const conversationIndex = allConversations.findIndex(
        (conversation) => conversation.user_id === userId
      );

      if (userData.hasOwnProperty(userId)) {
        userData[userId] = {
          ...userData[userId],
          status,
          lastLoginAt: new Date(),
        };
      }

      if (conversationIndex >= 0) {
        setAllConversations((prevConversations) => {
          const updatedConversations = [...prevConversations];

          const currentConversation = updatedConversations[conversationIndex];

          updatedConversations[conversationIndex] = {
            ...currentConversation,
            status,
          };

          return updatedConversations;
        });
      }
    };

    socket?.on("userOnline", ({ userId }) => handleUserOnline(userId, true));
    socket?.on("userOffline", ({ userId }) => handleUserOnline(userId, false));
    socket?.on("new_friend_request", handleNewFriendRequest);
    socket?.on("send_new_message", (data) => handleSendMessage(data, "send"));
    socket?.on("receive_new_message", (data) =>
      handleSendMessage(data, "receive")
    );
    socket?.on("user_typing", ({ senderId }) =>
      handleUserTyping(senderId, true)
    );
    socket?.on("user_stop_typing", ({ senderId }) =>
      handleUserTyping(senderId, false)
    );

    return () => {
      socket?.off("new_friend_request");
      socket?.off("send_new_message");
      socket?.off("receive_new_message");
      socket?.off("user_typing", handleUserTyping);
      socket?.off("user_stop_typing", handleUserTyping);
    };
  }, [socket, allConversations]);

  return (
    <MessageContext.Provider
      value={{
        socket,
        setSocket,
        allConversations,
        setAllConversations,
        allConversationsLoading,
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
