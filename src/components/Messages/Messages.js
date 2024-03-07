"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import {
  IoAddCircleOutline,
  IoChevronBackOutline,
  IoDocumentText,
  IoGift,
  IoHappyOutline,
  IoHeartOutline,
  IoImage,
  IoImages,
  IoSendOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
// import io from "socket.io-client";

export default function Messages({ userId }) {
  const bottomScroll = useRef(null);

  const [msgData, setMsgData] = useState({
    user: {},
    allMessages: [],
    message: "",
    pageLoading: true,
  });

  useLayoutEffect(() => {
    if (bottomScroll.current) {
      bottomScroll.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // const socket = io("http://localhost:3005");

    // try {
    //   fetch("/api/socket")
    //     .then((res) => res.json())
    //     .then((res) => console.log("Messaging data=>", res))
    //     .catch((error) => {
    //       console.log(error.message);
    //     });
    // } catch (error) {
    //   console.log(error);
    // }
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResponse = await fetch(`/api/users/profile/${userId}`);
        if (!userDataResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userDataResponse.json();
        setMsgData((presVal) => ({ ...presVal, user: userData.data }));
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      } finally {
        setMsgData((presVal) => ({ ...presVal, pageLoading: false }));
      }
    };

    fetchData();
  }, [userId]);

  if (msgData.pageLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 ">
      {/* <!-- chat heading --> */}
      <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700">
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
            <div className="w-2 h-2 bg-teal-500 rounded-full absolute right-0 bottom-0 m-px"></div>
          </div>
          <div className="cursor-pointer">
            <div className="text-base font-bold">{msgData?.user?.fullName}</div>
            <div className="text-xs text-green-500 font-semibold"> Online</div>
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
      <div className="w-full p-5 overflow-y-auto sm:h-[calc(100vh-137px)] h-[calc(100vh-127px)]">
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

        <div className="text-sm font-medium space-y-6">
          {/* <!-- received --> */}
          <div className="flex gap-3">
            <div className="relative w-9 h-9">
              <Image
                src="/people-know/avatar-6.jpg"
                alt="profile"
                className="rounded-full shadow"
                fill={true}
              />
            </div>
            <div className="px-4 py-2 rounded-[20px] max-w-sm bg-secondery">
              Hi, I’m John
            </div>
          </div>

          {/* <!-- sent --> */}
          <div className="flex gap-2 flex-row-reverse items-end">
            <div className="relative w-5 h-5">
              <Image
                src="/people-know/avatar-3.jpg"
                alt="profile"
                className="rounded-full shadow"
                fill={true}
              />
            </div>
            <div className="px-4 py-2 rounded-[20px] max-w-sm bg-gradient-to-tr from-sky-500 to-blue-500 text-white shadow">
              I’m Lisa. welcome John
            </div>
          </div>

          {/* <!-- time --> */}
          <div className="flex justify-center ">
            <div className="font-medium text-gray-500 text-sm dark:text-white/70">
              April 8,2023,6:30 AM
            </div>
          </div>

          {/* <!-- sent media--> */}
          <div className="flex gap-2 flex-row-reverse items-end">
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
          </div>
        </div>
      </div>

      {/* <!-- sending message area --> */}
      <div className="flex items-center md:gap-4 gap-2 md:p-3 p-2 overflow-hidden">
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
        <div className="relative flex-1">
          <textarea
            placeholder="Write your message"
            rows="1"
            className="w-full resize-none bg-secondery rounded-full px-4 p-2"
          ></textarea>

          <button
            type="button"
            className="shrink-0 p-2 absolute right-0.5 top-0"
          >
            <IoSendOutline className="text-xl flex md" />
          </button>
        </div>

        <button type="button" className="flex h-full dark:text-white">
          <IoHeartOutline className="text-3xl flex -mt-3 md" />
        </button>
      </div>
    </div>
  );
}
