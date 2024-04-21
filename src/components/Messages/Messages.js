"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoChevronBackOutline,
  IoHappyOutline,
  IoHeartOutline,
  IoSendOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { UserContext } from "@/app/_context/User";
import { MessageContext } from "@/app/_context/Message";
import UnreadMessage from "./UnreadMessage";
import { formatTimestampOnDays } from "@/helpers/all";
import { ImageLoading4 } from "../Loaders/Profile/ImageLoading";
import toast from "react-hot-toast";

export default function Messages({ userId }) {
  const bottomScroll = useRef(null);
  const { userDetails } = useContext(UserContext);
  const { socket } = useContext(MessageContext);

  const [msgData, setMsgData] = useState({
    user: {},
    lastReadMessage: null,
    message: "",
    pageLoading: true,
    msgLoadig: true,
  });

  const {
    conversations,
    setConversations,
    conversationId,
    setConversationId,
    messageData,
    setMessageData,
  } = useContext(MessageContext);

  useEffect(() => {
    if (bottomScroll.current) {
      bottomScroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messageData, conversationId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMsgData((prevData) => ({ ...prevData, msgLoadig: true }));
        const [userDataResponse, conversationResponse] = await Promise.all([
          fetch(`/api/users/profile/${userId}`),
          fetch(`/api/conversations?q=${userId}`),
        ]);

        if (!userDataResponse.ok || !conversationResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [userData, conversationData] = await Promise.all([
          userDataResponse.json(),
          conversationResponse.json(),
        ]);

        setConversationId(conversationData?.id ? conversationData.id : "new");

        if (
          conversationData?.id &&
          (!messageData || !messageData[conversationData.id])
        ) {
          socket?.emit(
            "get_messages",
            {
              conversationId: conversationData?.id,
              loggedUser: userDetails?._id,
            },
            (messages) => {
              setMessageData((prevState) => ({
                ...prevState,
                [conversationData?.id]: [
                  ...(prevState?.[conversationData?.id] || []),
                  ...messages,
                ],
              }));
              setConversations((prevState) => {
                const newData = [...prevState];
                const index = newData.findIndex(
                  (item) => item.id === conversationData?.id
                );
                if (index !== -1) {
                  newData[index] = { ...newData[index], unreadCount: 0 };
                }
                return newData;
              });
            }
          );
        }

        socket?.emit(
          "read_mssages",
          {
            conversationId: conversationData?.id,
            loggedUser: userDetails?._id,
          },
          () => {
            const conversationIndex = conversations.findIndex(
              (e) => e.user_id === userId
            );

            if (conversationIndex !== -1) {
              const updatedConversations = [...conversations];
              updatedConversations[conversationIndex].unreadCount = 0;
              setConversations(updatedConversations);
            }
          }
        );

        setMsgData((prevData) => ({
          ...prevData,
          user: userData.data,
          lastReadMessage:
            conversationData?.conversation?.lastReadMessage ?? null,
          msgLoadig: false,
        }));
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      } finally {
        setMsgData((presVal) => ({ ...presVal, pageLoading: false }));
      }
    };

    if (userId && userDetails && socket) {
      fetchData();
    }
  }, [userId, userDetails, socket]);

  useEffect(() => {
    socket?.emit(
      "read_mssages",
      {
        conversationId: conversationId,
        loggedUser: userDetails?._id,
      },
      () => {
        const conversationIndex = conversations.findIndex(
          (e) => e.user_id === userId
        );

        if (conversationIndex !== -1) {
          const updatedConversations = [...conversations];
          updatedConversations[conversationIndex].unreadCount = 0;
          setConversations(updatedConversations);
        }
      }
    );
  }, [messageData]);

  const handleSendMessage = (e, type = "") => {
    let message = msgData?.message ?? "";

    // If the `type` is "like", get the message from the event target's inner text
    if (type === "like") {
      message = e?.target?.innerText ?? "";
    }

    // Trim any extra spaces and validate message content
    const messageText = message.trim();

    if (!messageText) {
      console.warn("Attempted to send an empty or invalid message.");
      return;
    }

    const messagePayload = {
      conversationId: conversationId ?? "new",
      senderId: userDetails?._id,
      receiverId: userId,
      avatar: msgData?.user?.avatar,
      username: msgData?.user?.username,
      type: "text",
      text: messageText,
    };

    // Send the socket event to emit the message
    socket?.emit("send_message", messagePayload);

    // Clear the message in `msgData` after sending
    setMsgData((prevVal) => ({ ...prevVal, message: "" }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleOnChange = (e) => {
    setMsgData((presVal) => ({ ...presVal, message: e.target.value }));

    // socket.emit("typing_message", {
    //   senderId: userDetails._id,
    //   receiverId: userId,
    // });

    // socket.on("send_typing_message", (data) => {
    //   console.log("User is typing:", data);
    // });
  };

  if (msgData.pageLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex-1 overflow-y-scroll h-screen">
      {/* <!-- chat heading --> */}
      <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 sticky top-0 bg-white">
        <div className="flex items-center sm:gap-4 gap-2">
          {/* <!-- toggle for mobile --> */}
          <Link href="/messages" className="md:hidden">
            <IoChevronBackOutline className="text-2xl -ml-4 md" />
          </Link>

          <div className="relative w-8 h-8 cursor-pointer max-md:hidden">
            <Image
              src={msgData?.user?.avatar}
              alt="profile"
              className="rounded-full shadow"
              fill={true}
            />
            <div
              className={`w-2 h-2 ${
                msgData.user.status && "bg-teal-500"
              } rounded-full absolute right-0 bottom-0 m-px`}
            ></div>
          </div>
          <div className="cursor-pointer">
            <div className="text-base font-bold">{msgData?.user?.fullName}</div>
            <div
              className={`text-xs ${
                msgData.user.status ? "text-green-500" : "text-gray-500"
              } font-semibold`}
            >
              {msgData.user.status
                ? "Online"
                : formatTimestampOnDays(msgData.user.lastLoginAt)}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" className="button__ico">
            <FaPhoneAlt className="text-2xl" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-100 p-1.5 rounded-full"
          >
            <IoVideocamOutline className="text-2xl" />
          </button>
          <button
            type="button"
            className="hover:bg-slate-100 p-1.5 rounded-full"
          >
            <BsInfoCircle className="text-2xl" />
          </button>
        </div>
      </div>

      {/* <!-- chats bubble --> */}
      <div className="w-full p-5">
        <div className="py-5 text-center text-sm lg:pt-8">
          <div className="relative w-24 h-24 rounded-full mx-auto mb-3">
            <Image
              src={msgData?.user?.avatar}
              alt="profile"
              className="rounded-full shadow"
              fill={true}
            />
          </div>
          <div className="mt-8">
            <div className="md:text-xl text-base font-medium text-black dark:text-white">
              {msgData?.user?.fullName}
            </div>
            <div className="text-gray-500 text-sm dark:text-white/80">
              @{msgData?.user?.username}
            </div>
          </div>
          <div className="mt-3.5">
            <Link
              href={`/profile/${userId}`}
              className="inline-block rounded-lg px-4 py-1.5 text-sm font-semibold bg-secondery"
            >
              View profile
            </Link>
          </div>
        </div>
        {msgData.msgLoadig ? (
          <ImageLoading4 className="w-12 h-12" />
        ) : (
          <>
            <div className="font-medium space-y-2 mb-12">
              {messageData?.[conversationId]?.map((e, i) => (
                <Fragment key={e._id || `msg-${i}`}>
                  <div>
                    {e.senderId === userDetails?._id ? (
                      // {/* <!-- sent --> */}
                      <div className={`flex gap-2 flex-row-reverse items-end`}>
                        <div className="relative w-5 h-5">
                          <Image
                            src={userDetails?.avatar}
                            alt="profile"
                            className="rounded-full shadow"
                            fill={true}
                          />
                        </div>
                        <div
                          className={`px-4 py-2  max-w-sm rounded-[20px] text-white shadow bg-gradient-to-tr from-sky-500 to-blue-500`}
                        >
                          {e.text}
                        </div>
                      </div>
                    ) : (
                      // {/* <!-- received --> */}
                      <>
                        <div className={`flex gap-2`}>
                          <div className="relative w-9 h-9">
                            <Image
                              src={msgData?.user?.avatar}
                              alt="profile"
                              className="rounded-full shadow"
                              fill={true}
                            />
                          </div>
                          <div className="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
                            {e.text}
                          </div>
                        </div>
                      </>
                    )}
                    {messageData?.[conversationId].length > i + 1 &&
                      e._id === msgData?.lastReadMessage &&
                      messageData?.[conversationId]?.[i + 1]?.senderId !==
                        userDetails?._id && <UnreadMessage />}
                  </div>
                </Fragment>
              ))}
              {/* <!-- time --> */}
              {/* <div className="flex justify-center ">
            <div className="font-medium text-gray-500 text-sm dark:text-white/70">
              April 8,2023,6:30 AM
            </div>
          </div> */}

              {/* <!-- sent media--> */}
              {/* <div className="flex gap-2 flex-row-reverse items-end">
            <div className="relative w-4 h-4">
              <Image
                src="/people-know/avatar-3.jpg"
                alt="profile"
                className="rounded-full shadow"
                fill={true}
              />
            </div>

            <a className="block rounded-[18px] border overflow-hidden" href="#">
              <div className="max-w-md">
                <div className="max-w-full relative w-72 h-52">
                  <Image
                    src="/product-3.jpg"
                    alt="profile"
                    className="object-cover"
                    fill={true}
                  />
                </div>
              </div>
            </a>
          </div> */}
            </div>
            <div ref={bottomScroll}></div>
          </>
        )}
      </div>

      {/* <!-- sending message area --> */}
      {/* <div className=" items-center md:gap-4 gap-2 md:p-3 p-2 h-14 fixed w-full bottom-0 bg-white shadow-lg"> */}
      <div className="flex justify-between items-center gap-2 h-14 fixed w-[-webkit-fill-available] bottom-0 bg-white z-20 p-2 border-t shadow-lg">
        <div
          id="message__wrap"
          className="flex items-center gap-2 h-full dark:text-white -mt-1.5"
        >
          <button type="button" className="shrink-0">
            <IoAddCircleOutline className="text-3xl flex md" />
          </button>
          <button type="button">
            <IoHappyOutline className="text-3xl flex md" />
          </button>
        </div>
        <div className="relative flex-1 ">
          <input
            placeholder="Write your message"
            className="w-full resize-none bg-secondery rounded-full px-4 p-2"
            onChange={handleOnChange}
            value={msgData.message}
            onKeyDown={handleKeyDown}
          ></input>

          <button
            type="button"
            className="shrink-0 p-2 absolute right-0.5 top-0"
            onClick={handleSendMessage}
          >
            <IoSendOutline className="text-xl flex md" />
          </button>
        </div>

        {/* <button type="button" className="flex h-full dark:text-white" onClick={handleSendMessage}>
        &#128077;
          <IoHeartOutline className="text-3xl flex -mt-3 md" />
        </button> */}
        <button
          type="button"
          className="flex h-full dark:text-white text-2xl" // Use text size classes
          onClick={(e) => handleSendMessage(e, "like")}
        >
          &#128077;
        </button>
      </div>
    </div>
  );
}
