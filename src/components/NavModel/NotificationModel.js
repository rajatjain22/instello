"use client";

import Image from "next/image";
import Link from "next/link";
import { IoCheckmarkCircleOutline, IoSettingsOutline } from "react-icons/io5";
import NavModel from "./NavModel";
import { useContext, useEffect, useRef, useState } from "react";
import useOnClickOutside from "@/app/_hooks/useClickOutside";
import { UserContext } from "@/app/_context/User";

export default function NotificationModel({ onClose }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, onClose);

  const [notificationData, setNotificationData] = useState({
    followRequest: [],
    isPrivate: false,
    loading: true,
    confirmBtnLoading: false,
  });

  useEffect(() => {
    fetch("/api/users/request")
      .then((res) => res.json())
      .then((res) => {
        if (res?.message) {
          setNotificationData((presVal) => ({
            ...presVal,
            isPrivate: res.data.isPrivate,
            followRequest: res.data.followRequest,
          }));
        } else {
          throw new Error(res?.error);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setNotificationData((presVal) => ({ ...presVal, loading: false }));
      });
  }, []);

  const handleConfirm = (folID) => {
    try {
      setNotificationData((presVal) => ({
        ...presVal,
        confirmBtnLoading: true,
      }));
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followeeId: folID,
          action: "confirm",
        }),
      };
      fetch("/api/users/followToggle", requestData)
        .then((res) => res.json())
        .then((res) => {
          const profile = notificationData.followRequest.find(
            (e) => e._id === folID
          );
          console.log(profile)
          setUserDetails((presVal) => ({
            ...presVal,
            followers: [...presVal.followers, profile],
            followRequest: presVal.followRequest.filter(
              (reqId) => reqId !== profile._id
            ),
          }));
          setNotificationData((prevState) => ({
            ...prevState,
            followRequest: prevState.followRequest.filter((id) => id !== folID),
          }));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.message);
    } finally {
      setNotificationData((presVal) => ({
        ...presVal,
        confirmBtnLoading: true,
      }));
    }
  };

  return (
    <div ref={modalRef}>
      <NavModel>
        <div className="flex items-center justify-between px-5 py-4 sm:mt-3 mt-12">
          <h3 className="md:text-xl text-lg font-medium mt-3 text-black dark:text-white">
            Notification
          </h3>

          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
        </div>

        {/* <!-- contents list --> */}
        <div className="px-2 -mt-2 text-sm font-normal">
          {notificationData.isPrivate &&
            notificationData.followRequest.length > 0 && (
              <div className="px-5 py-3 -mx-2">
                <h4 className="font-semibold">Follow request</h4>
                {notificationData.followRequest.map((val) => (
                  <div className="flex justify-between items-center">
                    <Link
                      key={val._id} // Make sure to include a unique key prop for each element in the array
                      href={`/profile/${val._id}`}
                      className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
                      onClick={onClose}
                    >
                      <div className="relative w-12 h-12 shrink-0">
                        <Image
                          src={val.avatar}
                          alt="profile"
                          className="object-cover rounded-full"
                          fill={true}
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1">
                        <p>
                          <b className="font-bold mr-1">{val.fullName}</b>
                        </p>
                        <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                          Follow request for you
                        </div>
                      </div>
                    </Link>
                    <button
                      type="button"
                      className="button text-white bg-primary"
                      onClick={() => handleConfirm(val._id)}
                    >
                      Confirm
                    </button>
                  </div>
                ))}
              </div>
            )}
          <div className="border-t px-5 py-3 -mx-2 mt-4 dark:border-slate-700/40">
            <h4 className="font-semibold">This Week</h4>
          </div>

          <a
            href="#"
            className="relative flex items-center gap-3 p-2 duration-200 rounded-xl pr-10 hover:bg-secondery bg-teal-500/5"
          >
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/people-know/avatar-3.jpg"
                alt="profile"
                className="object-cover rounded-full"
                fill={true}
                loading="lazy"
              />
            </div>
            <div className="flex-1 ">
              <p>
                <b className="font-bold mr-1"> Sarah Gray</b> sent you a
                message. He wants to chat with you. 💖
              </p>
              <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                4 hours ago
              </div>
              <div className="w-2.5 h-2.5 bg-teal-600 rounded-full absolute right-3 top-5"></div>
            </div>
          </a>
          <a
            href="#"
            className="relative flex items-center gap-3 p-2 duration-200 rounded-xl hover:bg-secondery"
          >
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src="/people-know/avatar-4.jpg"
                alt="profile"
                className="object-cover rounded-full"
                fill={true}
                loading="lazy"
              />
            </div>
            <div className="flex-1 ">
              <p>
                <b className="font-bold mr-1"> James Lewis</b> Start following
                you on instello
              </p>
              <div className="text-xs text-gray-500 mt-1.5 dark:text-white/80">
                8 hours ago
              </div>
            </div>
            <button
              type="button"
              className="button bg-primary-soft text-primary"
            >
              fallowing
            </button>
          </a>
        </div>
      </NavModel>
    </div>
  );
}
