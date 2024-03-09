import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { IoCamera } from "react-icons/io5";

export default function ProfilePicture({ profile }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [profileloading, setProfileloading] = useState(false);

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
          setProfile((presVal) => ({ ...presVal, avatar: res.data.avatar }));
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
        profile._id === userDetails._id ? "hover:scale-110 duration-500" : ""
      }`}
    >
      <label
        htmlFor="file"
        className={`${profile._id === userDetails._id && "cursor-pointer"}`}
      >
        <div className="relative  flex justify-center items-center md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
          {profileloading ? (
            <div className="text-sm md:text-2xl text-white">
              <ImageLoading4 className="w-20 h-20" />
            </div>
          ) : (
            <Image
              className="shrink-0 bg-fuchsia-100 rounded-2xl"
              src={profile.avatar}
              alt="Picture of the author"
              fill={true}
              loading="lazy"
            />
          )}
        </div>
      </label>
      {profile._id === userDetails._id && (
        <>
          <button
            type="button"
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow p-1.5 rounded-full md:flex hidden"
          >
            <IoCamera className="text-2xl" />
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
