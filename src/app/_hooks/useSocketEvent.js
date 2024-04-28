import { CustomToast } from "@/components/common/CustomToast";
import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const useSocketEvents = (
  socket,
  allConversations,
  setAllConversations,
  setMessageData
) => {
  const handleNewFriendRequest = useCallback((data) => {
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
  }, []);

  const handleSendMessage = useCallback(
    (data, type) => {
      console.log("object")
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
    },
    [setAllConversations] // Include only the necessary dependencies
  );

  const updateTypingStatus = useCallback(
    (userId, typing) => {
      const convIndex = allConversations.findIndex((e) => e.user_id === userId);
      if (convIndex >= 0) {
        setAllConversations((prev) => {
          const updated = [...prev];
          updated[convIndex] = { ...updated[convIndex], typing };
          return updated;
        });
      }
    },
    [allConversations, setAllConversations]
  );

  const onUserOnline = useCallback(
    (userId, status) => {
      const convIndex = allConversations.findIndex((c) => c.user_id === userId);
      if (convIndex >= 0) {
        setAllConversations((prev) => {
          const updated = [...prev];
          updated[convIndex] = { ...updated[convIndex], status };
          return updated;
        });
      }
    },
    [setAllConversations]
  );

  useEffect(() => {
    if (!socket) return;

    socket.on("new_friend_request", handleNewFriendRequest);
    socket.on("send_new_message", (data) => handleSendMessage(data, "send"));
    socket.on("receive_new_message", (data) =>
      handleSendMessage(data, "receive")
    );
    socket.on("user_typing", (data) => updateTypingStatus(data.senderId, true));
    socket.on("user_stop_typing", (data) =>
      updateTypingStatus(data.senderId, false)
    );
    socket.on("userOnline", ({ userId }) => onUserOnline(userId, true));
    socket.on("userOffline", ({ userId }) => onUserOnline(userId, false));

    return () => {
      socket.off("new_friend_request", handleNewFriendRequest);
      socket.off("send_new_message", (data) => handleSendMessage(data, "send"));
      socket.off("receive_new_message", (data) =>
        handleSendMessage(data, "receive")
      );
      socket.off("user_typing", (data) =>
        updateTypingStatus(data.senderId, true)
      );
      socket.off("user_stop_typing", (data) =>
        updateTypingStatus(data.senderId, false)
      );
      socket.off("userOnline", onUserOnline);
      socket.off("userOffline", onUserOnline);
    };
  }, [socket, allConversations, setAllConversations, setMessageData]);
  return null;
};
export default useSocketEvents;
