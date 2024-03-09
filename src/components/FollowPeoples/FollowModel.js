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

export default function FollowModel({ isOpen, onClose, id, type }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});

  const fetchData = async (action) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/profile/${id}/${action}`);
      if (res.status === 404) {
        // setNotFound(true);
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await res.json();
      setAllData(data.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
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
        const updateFollowStatus = (prevState, index, val, type) => {
          const countField =
            type === "following" ? "followingCount" : "followersCount";

          const updatedUserData = [...prevState[type]];

          updatedUserData[index] = {
            ...updatedUserData[index],
            followed_by_viewer: val === "follow",
          };

          const countChange =
            val === "follow" && userDetails._id === allData._id
              ? 1
              : val === "unfollow" && userDetails._id === allData._id
              ? -1
              : 0;

          return {
            ...prevState,
            [type]: updatedUserData,
            [countField]: prevState[countField] + countChange,
          };
        };

        const followUserIndex = allData?.[type]?.findIndex(
          (e) => e._id === followerId
        );

        if (followUserIndex !== -1 && followUserIndex !== undefined) {
          setUserDetails((prevState) => ({
            ...prevState,
            followingCount:
              prevState.followingCount + (val === "follow" ? 1 : -1),
          }));

          setAllData((prevState) =>
            updateFollowStatus(prevState, followUserIndex, val, type)
          );
        } else if (val === "remove") {
          setUserDetails((prevState) => ({
            ...prevState,
            followers: prevState.followers - 1,
          }));

          setAllData((prevState) => {
            const updatedUserData = prevState.followers.filter(
              (e) => e._id !== followerId
            );
            return {
              ...prevState,
              followers: updatedUserData,
              followersCount: prevState.followersCount - 1,
            };
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

  useEffect(() => {
    fetchData(type);
  }, [isOpen, onClose, id, type]);

  return (
    <div>
      <ModelBox isOpen={isOpen} onClose={onClose}>
        <div className="sm:px-4 sm:py-3 p-2.5 border-b border-gray-100 capitalize text-lg font-medium text-center">
          {type}
        </div>
        <div className="bg-white flex flex-col text-black gap-3 sm:px-4 sm:py-3 p-2.5 h-72 overflow-y-scroll">
          {loading ? (
            <>
              <UserPlaceholderWithButton />
              <UserPlaceholderWithButton />
              <UserPlaceholderWithButton />
              <UserPlaceholderWithButton />
              <UserPlaceholderWithButton />
            </>
          ) : (
            allData?.[type]?.map((user, index) => (
              <User
                key={index}
                className={"flex justify-between items-center"}
                user={user}
                followButton={true}
                handleFollow={handleFollow}
                isLoading={loadingStates[user._id]}
              />
            ))
          )}
        </div>
      </ModelBox>
    </div>
  );
}
