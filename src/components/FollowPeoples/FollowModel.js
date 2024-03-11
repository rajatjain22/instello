import React, { useContext, useEffect, useState } from "react";
import ModelBox from "../common/ModelBox";
import FollowPeoples from "./FollowPeoples";
import Following from "./Following";
import { UserContext } from "@/app/_context/User";
import Link from "next/link";
import Image from "next/image";
import FollowButton from "../common/FollowButton";
import User from "../common/User";
import { UserPlaceholderWithButton } from "../Placeholders/UserPlaceholder";
import toast from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FollowModel({ isOpen, onClose, id, type }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [allData, setAllData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (action) => {
    try {
      const res = await fetch(
        `/api/users/profile/${id}/${action}?page=${page}`
      );
      if (res.status === 404) {
        // setNotFound(true);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await res.json();
      setAllData((presVal) => [...presVal, ...data.data[type]]);
      setPage((presVal) => presVal + 1);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleFollow = (followerId, val) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [followerId]: true,
    }));

    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followeeId: followerId, action: val }),
    };
    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        const followUserIndex = allData?.findIndex((e) => e._id === followerId);
        if (
          val !== "remove" &&
          followUserIndex !== -1 &&
          followUserIndex !== undefined
        ) {
          setUserDetails((prevState) => ({
            ...prevState,
            followingCount:
              prevState.followingCount + (val === "follow" ? 1 : -1),
          }));

          setAllData((prevState) => {
            const updatedUserData = [...prevState];

            updatedUserData[followUserIndex] = {
              ...updatedUserData[followUserIndex],
              followed_by_viewer: val === "follow",
            };

            return updatedUserData;
          });
        } else if (val === "remove") {
          setUserDetails((prevState) => ({
            ...prevState,
            followersCount: prevState.followersCount - 1,
          }));

          setAllData((prevState) => {
            const updatedUserData = prevState.filter(
              (e) => e._id !== followerId
            );
            return updatedUserData;
          });
        }

        toast.success(val);
      })
      .catch((err) => console.log(err.message))
      .finally(() => {
        setLoadingStates((prevLoadingStates) => ({
          ...prevLoadingStates,
          [followerId]: false,
        }));
      });
  };
  console.log(userDetails);

  useEffect(() => {
    fetchData(type);
  }, []);

  return (
    <div>
      <ModelBox isOpen={isOpen} onClose={onClose}>
        <div className="sm:px-4 sm:py-3 p-2.5 border-b border-gray-100 capitalize text-lg font-medium text-center">
          {type}
        </div>
        <div
          id="scrollableDiv"
          className="bg-white flex flex-col text-black gap-3 sm:px-4 sm:py-3 p-2.5 h-72 overflow-y-scroll"
        >
          <InfiniteScroll
            dataLength={allData?.length}
            next={() => fetchData(type)}
            hasMore={hasMore}
            loader={
              <>
                <UserPlaceholderWithButton />
                <UserPlaceholderWithButton />
                <UserPlaceholderWithButton />
                <UserPlaceholderWithButton />
                <UserPlaceholderWithButton />
              </>
            }
            className="flex flex-col text-black gap-3"
            scrollableTarget="scrollableDiv"
          >
            {allData?.map((user, index) => (
              <User
                key={index}
                className={"flex justify-between items-center"}
                user={user}
                followButton={true}
                handleFollow={handleFollow}
                isLoading={loadingStates[user._id]}
                isRemove={type === "followers" && userDetails._id === id}
              />
            ))}
          </InfiniteScroll>
        </div>
      </ModelBox>
    </div>
  );
}
