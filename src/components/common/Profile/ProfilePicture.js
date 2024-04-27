"use client";

import { UserContext } from "@/app/_context/User";
import { ImageLoading4 } from "@/components/Loaders/Profile/ImageLoading";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

export default function ProfilePicture({ profile }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [profileloading, setProfileloading] = useState(false);
  const [profileData, setProfileData] = useState(false);

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  const handleUpdateProfile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Checking if the file type is allowed or not
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file?.type)) {
        toast.error("Only JPEG, PNG, and GIF images are allowed.");
        return;
      }

      setProfileloading(true);
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch(`/api/users/profile/${profile._id}`, {
          method: "PUT",
          body: formData,
        });
        if (response.ok) {
          const res = await response.json();
          setProfileData((presVal) => ({
            ...presVal,
            avatar: res.data.avatar,
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            avatar: res.data.avatar,
          }));
        } else {
          console.error("Upload failed", response);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setProfileloading(false);
      }
      console.log("image upload");
    }
  };

  return (
    <div
      className={`relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md ${
        profileData._id === userDetails._id
          ? "hover:scale-110 duration-500"
          : ""
      }`}
    >
      <label
        htmlFor="file"
        className={`${profileData._id === userDetails._id && "cursor-pointer"}`}
      >
        <div className="relative  flex justify-center items-center md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
          {profileloading ? (
            <div className="text-sm md:text-2xl text-white">
              <ImageLoading4 className="w-20 h-20" />
            </div>
          ) : (
            <Image
              className="shrink-0 bg-fuchsia-100 rounded-2xl"
              src={profileData.avatar}
              alt="Picture of the author"
              fill={true}
              loading="lazy"
            />
          )}
        </div>
      </label>
      {profileData._id === userDetails._id && (
        <>
          <button
            type="button"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full md:flex hidden"
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
              <circle cx="256" cy="272" r="64"></circle>
              <path d="M432 144h-59c-3 0-6.72-1.94-9.62-5l-25.94-40.94a15.52 15.52 0 0 0-1.37-1.85C327.11 85.76 315 80 302 80h-92c-13 0-25.11 5.76-34.07 16.21a15.52 15.52 0 0 0-1.37 1.85l-25.94 41c-2.22 2.42-5.34 5-8.62 5v-8a16 16 0 0 0-16-16h-24a16 16 0 0 0-16 16v8h-4a48.05 48.05 0 0 0-48 48V384a48.05 48.05 0 0 0 48 48h352a48.05 48.05 0 0 0 48-48V192a48.05 48.05 0 0 0-48-48zM256 368a96 96 0 1 1 96-96 96.11 96.11 0 0 1-96 96z"></path>
            </svg>
          </button>

          <input
            id="file"
            type="file"
            name="file"
            className="hidden"
            onChange={handleUpdateProfile}
            accept="image/*"
            disabled={profileloading}
          />
        </>
      )}
    </div>
  );
}
