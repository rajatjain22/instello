"use client";

import Image from "next/image";
import Link from "next/link";
import {
  IoCamera,
  IoCameraOutline,
  IoEllipsisHorizontal,
} from "react-icons/io5";
import PostList from "./PostList";
import { MdOutlineVerified } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/_context/User";
import toast from "react-hot-toast";
import { ImageLoading4 } from "../Loaders/Profile/ImageLoading";
import PostImage from "../PostContainer/PostImage";
import FollowButton from "../FollowButton/FollowButton";
import ProfilePlaceholder from "../Placeholders/profile/ProfilePlaceholder";

export default function Profile({ userId }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [profileloading, setProfileloading] = useState(false);
  const [followBtnLoading, setFollowBtnLoading] = useState(false);
  const [stickyTabChange, setStickyTabChange] = useState("images-posts");

  useEffect(() => {
    if (!userId && !userDetails) return;
    if (userId === userDetails?._id) {
      return setProfile(userDetails);
    }

    const fetchData = async () => {
      try {
        const userDataResponse = await fetch(`/api/users/profile/${userId}`);
        if (!userDataResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userDataResponse.json();

        if (userData.data.followed_by_viewer) {
          const postDataResponse = await fetch(`/api/post/${userId}`);
          if (!postDataResponse.ok) {
            throw new Error("Network response for user's posts was not ok");
          }
          const postData = await postDataResponse.json();

          setProfile({ ...userData.data, posts: postData.data });
        } else {
          setProfile({ ...userData.data, posts: [] });
        }
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleFollow = (val) => {
    setFollowBtnLoading(true);
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        followeeId: profile._id,
        action: val,
      }),
    };
    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        if (val === "follow") {
          setProfile((prevState) => ({
            ...prevState,
            followed_by_viewer: true,
            followersCount: prevState.followersCount + 1,
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount + 1,
          }));
        } else if (val === "unfollow") {
          setProfile((prevState) => ({
            ...prevState,
            followed_by_viewer: false,
            followersCount: prevState.followersCount - 1,
          }));
          setUserDetails((presVal) => ({
            ...presVal,
            followingCount: presVal.followingCount - 1,
          }));
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setFollowBtnLoading(false);
      });
  };

  if (!profile) {
    return <div><ProfilePlaceholder /></div>;
  }

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
    <>
      <div className="py-6 relative">
        <div className="flex md:gap-16 gap-4 max-md:flex-col">
          <div
            className={`relative md:p-1 rounded-full h-full max-md:w-16 bg-gradient-to-tr from-pink-400 to-pink-600 shadow-md ${
              userId === userDetails._id ? "hover:scale-110 duration-500" : ""
            }`}
          >
            <label
              htmlFor="file"
              className={`${userId === userDetails._id && "cursor-pointer"}`}
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
            {userId === userDetails._id && (
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
          <div className="max-w-2x flex-1">
            <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
              {profile.fullName}
              {profile.isVerified ? <MdOutlineVerified /> : ""}
            </h3>

            <p className="sm:text-sm text-blue-600 mt-1 font-normal text-xs">
              @{profile.username}
            </p>

            <p className="text-sm mt-2 md:font-normal font-light whitespace-pre-line">
              {profile?.bio}
            </p>

            <div className="flex md:items-end justify-between md:mt-8 mt-4 max-md:flex-col gap-4">
              <div className="flex sm:gap-10 gap-6 sm:text-sm text-xs max-sm:absolute max-sm:top-10 max-sm:left-36 text-center">
                <div>
                  <p>Posts</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile?.postsCount}
                  </h3>
                </div>

                <Link
                  href={`${
                    profile.followed_by_viewer ||
                    userDetails._id === profile._id
                      ? `/profile/${profile._id}/followers`
                      : "#"
                  }`}
                  className={`${
                    (
                      !profile.followed_by_viewer &&
                      userDetails._id !== profile._id
                    ) && "cursor-default"
                  }`}
                >
                  <p>Followers</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile.followersCount}
                  </h3>
                </Link>
                <Link
                  href={`${
                    profile.followed_by_viewer ||
                    userDetails._id === profile._id
                      ? `/profile/${profile._id}/following`
                      : "#"
                  }`}
                  className={`${
                    !profile.followed_by_viewer &&
                    userDetails._id !== profile._id &&
                    "cursor-default"
                  }`}
                >
                  <p>Following</p>
                  <h3 className="sm:text-xl sm:font-bold mt-1 text-black dark:text-white text-base font-normal">
                    {profile.followingCount}
                  </h3>
                </Link>
              </div>

              <div className="flex items-center gap-3 text-sm">
                {userDetails?._id === userId ? (
                  <Link
                    href={`/profile/${userDetails._id}/edit`}
                    type="button"
                    className="button bg-pink-100 text-pink-600 border border-pink-200"
                  >
                    Edit
                  </Link>
                ) : (
                  <>
                    <FollowButton
                      isFollowing={profile.followed_by_viewer}
                      isLoading={followBtnLoading}
                      onToggleFollow={() =>
                        handleFollow(
                          profile.followed_by_viewer ? "unfollow" : "follow"
                        )
                      }
                    />

                    {profile.followed_by_viewer && (
                      <button
                        type="submit"
                        className="button bg-pink-600 text-white"
                      >
                        Message
                      </button>
                    )}
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

      <div className="mt-10 flex flex-col gap-8 max-w-[600px] my-0 mx-auto">
        {/* <!-- sticky tabs --> */}
        <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
          <ul className="flex gap-2 justify-center border-t dark:border-slate-700">
            <li>
              <button
                onClick={() => setStickyTabChange("images-posts")}
                className={`flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent ${
                  stickyTabChange === "images-posts"
                    ? " aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    : ""
                }`}
                aria-expanded="true"
              >
                <IoCameraOutline className="text-lg" />
                Images
              </button>
            </li>
            <li>
              <button
                onClick={() => setStickyTabChange("all-posts")}
                className={`flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent ${
                  stickyTabChange === "all-posts"
                    ? " aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                    : ""
                }`}
                aria-expanded="true"
              >
                <IoCameraOutline className="text-lg" />
                All Posts
              </button>
            </li>
          </ul>
        </nav>

        {stickyTabChange === "images-posts" && (
          <PostList posts={profile?.posts} />
        )}
        {stickyTabChange === "all-posts" &&
          profile?.posts?.map((post, index) => (
            <PostImage key={index} user={userDetails} post={post} />
          ))}
      </div>
    </>
  );
}
