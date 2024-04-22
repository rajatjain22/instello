"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "@/app/_context/User";
import { MessageContext } from "@/app/_context/Message";
import UnreadMessage from "./UnreadMessage";
import { formatTimestampOnDays } from "@/helpers/all";
import { ImageLoading4 } from "../Loaders/Profile/ImageLoading";
import DocumentModel from "./DocumentModel";

export default function Messages({ userId }) {
  const bottomScroll = useRef(null);
  const { userDetails } = useContext(UserContext);
  const { socket } = useContext(MessageContext);

  const [msgData, setMsgData] = useState({
    user: {},
    lastReadMessage: null,
    message: "",
    documentSend: false,
    emojiSend: false,
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
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-2xl -ml-4 md"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="48"
                d="M328 112 184 256l144 144"
              ></path>
            </svg>
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
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
            </svg>
          </button>
          <button
            type="button"
            className="hover:bg-slate-100 p-1.5 rounded-full"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M374.79 308.78 457.5 367a16 16 0 0 0 22.5-14.62V159.62A16 16 0 0 0 457.5 145l-82.71 58.22A16 16 0 0 0 368 216.3v79.4a16 16 0 0 0 6.79 13.08z"
              ></path>
              <path
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M268 384H84a52.15 52.15 0 0 1-52-52V180a52.15 52.15 0 0 1 52-52h184.48A51.68 51.68 0 0 1 320 179.52V332a52.15 52.15 0 0 1-52 52z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="hover:bg-slate-100 p-1.5 rounded-full"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 16 16"
              className="text-2xl"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
            </svg>
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
            <div className="font-medium space-y-2 mb-16">
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
        <div>
          {msgData.documentSend && <DocumentModel />}
          <div
            id="message__wrap"
            className="flex items-center gap-2 h-full dark:text-white -mt-1.5"
          >
            <button
              type="button"
              className="shrink-0"
              onClick={() =>
                setMsgData((prevState) => ({
                  ...prevState,
                  documentSend: !prevState.documentSend,
                  emojiSend: false,
                }))
              }
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-3xl flex md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                ></path>
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M256 176v160m80-80H176"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() =>
                setMsgData((prevState) => ({
                  ...prevState,
                  documentSend: false,
                  emojiSend: !prevState.emojiSend,
                }))
              }
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-3xl flex md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="184" cy="232" r="24"></circle>
                <path d="M256.05 384c-45.42 0-83.62-29.53-95.71-69.83a8 8 0 0 1 7.82-10.17h175.69a8 8 0 0 1 7.82 10.17c-11.99 40.3-50.2 69.83-95.62 69.83z"></path>
                <circle cx="328" cy="232" r="24"></circle>
                <circle
                  cx="256"
                  cy="256"
                  r="208"
                  fill="none"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                ></circle>
              </svg>
            </button>
          </div>
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
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="text-xl flex md"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M470.3 271.15 43.16 447.31a7.83 7.83 0 0 1-11.16-7V327a8 8 0 0 1 6.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 0 1-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 0 1 0 29.39z"
              ></path>
            </svg>
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
