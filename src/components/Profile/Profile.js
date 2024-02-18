"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoCamera,
  IoCameraOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import StickyTabs from "./StickyTabs";
import PostList from "./PostList";
import ReelList from "./ReelList";
import ShortList from "./ShortList";
import HightlightList from "./HightlightList";
import { MdOutlineVerified } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/context/User";
import toast from "react-hot-toast";
import { ImageLoading2, ImageLoading3 } from "../Loaders/Profile/ImageLoading";

export default function Profile({ userId }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [isFollowed, setIsFollowed] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileloading, setProfileloading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    if (userId === userDetails._id) {
      return setProfile(userDetails);
    }
    fetch(`/api/users/profile/${userId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((res) => {
        const isCurrentUserFollowing = !!res.data.followers.find(
          (e) => e._id === userDetails?._id
        );
        setIsFollowed(isCurrentUserFollowing);
        setProfile(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, [userDetails]);

  const handleFollow = (val) => {
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followeeId: profile._id, action: val }),
    };
    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        const data = val === "follow" ? true : false;
        setIsFollowed(data);

        if (data && profile) {
          setProfile((prevState) => ({
            ...prevState,
            followers: [...prevState.followers, userDetails._id],
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            following: [...presVal.following, profile],
          }));
        } else if (!data && profile) {
          setProfile((presVal) => ({
            ...presVal,
            followers: presVal.followers.filter(
              (followerId) => followerId !== userDetails._id
            ),
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            following: presVal.following.filter(
              (followingId) => followingId._id !== profile._id
            ),
          }));
          console.log(userDetails);
        }
        toast.success(val);
      })
      .catch((err) => console.log(err.message));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const handleChangeImage = async (e) => {
    setProfileloading(true);
    const file = e.target.files[0];
    if (file) {
      // const { name, value, type, files } = e.target;
      // let avatar = "";
      // if (type === "file") {
      //   avatar = await convertBase64(files[0]);
      // }

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
        } else {
          console.error("Upload failed", response);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setProfileloading(false);
      }
    }
  };

  return (
    <>
      <div className="py-6 relative">
        <div className="flex md:gap-16 gap-4 max-md:flex-col">
          <div className="relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md hover:scale-110 duration-500">
            <label for="file" className="cursor-pointer">
              <div className="relative  flex justify-center items-center md:w-40 md:h-40 h-16 w-16 rounded-full overflow-hidden md:border-[6px] border-gray-100 shrink-0 dark:border-slate-900">
                {profileloading ? (
                  <div className="text-sm md:text-2xl text-white">
                    Loading...
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
              onChange={handleChangeImage}
              accept="image/*"
            />
          </div>
          <div className="max-w-2x flex-1">
            <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
              {profile.fullName}
              {profile.isVerified ? <MdOutlineVerified /> : ""}
            </h3>

            <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">
              @{profile.username}
            </p>

            <p className="text-sm mt-2 md:font-normal font-light">
              I love beauty and emotion. 🥰 I’m passionate about photography and
              learning. 📚 I explore genres and styles. 🌈 I think photography
              is storytelling. 📖 I hope you like and feel my photos. 😊
            </p>

            <p className="mt-2 space-x-2 text-gray-500 text-sm">
              <Link href="#" className="inline-block">
                Travel
              </Link>
              .
              <Link href="#" className="inline-block">
                Business
              </Link>
              .
              <Link href="#" className="inline-block">
                Technolgy
              </Link>
            </p>

            <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
              <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36">
                <div>
                  <p>Posts</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile?.posts?.length}
                  </h3>
                </div>
                <Link href={`/profile/${profile._id}/following`}>
                  <p>Following</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile.following.length}
                  </h3>
                </Link>
                <Link href={`/profile/${profile._id}/followers`}>
                  <p>Followers</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile.followers.length}
                  </h3>
                </Link>
              </div>
              <div className="flex items-center gap-3 text-sm">
                {userDetails?._id === userId ? (
                  <button
                    type="button"
                    className="button bg-pink-100 text-pink-600 border border-pink-200"
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    {isFollowed ? (
                      <button
                        type="button"
                        className="button bg-pink-100 text-pink-600 border border-pink-200"
                        onClick={() => handleFollow("unfollow")}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="button text-gray-600 bg-slate-200"
                        onClick={() => handleFollow("follow")}
                      >
                        Follow
                      </button>
                    )}
                    <button
                      type="submit"
                      className="button bg-pink-600 text-white"
                    >
                      Message
                    </button>
                  </>
                )}
                <div>
                  <button
                    type="submit"
                    className="rounded-lg bg-slate-200/60 flex px-2 py-1.5 dark:bg-dark2"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <IoEllipsisHorizontal />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {/* <!-- sticky tabs --> */}
        <StickyTabs />
        {/* <HightlightList /> */}

        <PostList posts={profile?.posts} />
        {/* <ReelList /> */}
        {/* <ShortList /> */}
      </div>
    </>
  );
}
