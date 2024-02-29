"use client";

import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FollowCard from "./FollowCard";
import { FollowPeoplePlaceholder } from "../Placeholders/FollowPeoplePlaceholder";

export default function Following() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { id, type } = useParams();
  const [showType, setShowType] = useState("");
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loadingStates, setLoadingStates] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/profile/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await res.json();
        setShowType(type);
        setAllData(data.data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, type]);

  const handleFollow = (followerId, val) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [followerId]: true,
    }));

    const dd = allData.followers.findIndex((e) => e._id === followerId);

    const followAction = val;
    const requestData = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ followeeId: followerId, action: followAction }),
    };
    fetch("/api/users/followToggle", requestData)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Server response wasn't OK");
        }
        return res.json();
      })
      .then((res) => {
        // Handle follow/unfollow
        const data = val === "follow" ? true : false;
        if (data && allData) {
          setUserDetails((prevState) => ({
            ...prevState,
            following: [...prevState.following, allData.followers[dd]],
          }));
          setAllData((prevState) => ({
            ...prevState,
            following: [...prevState.following, allData.followers[dd]],
          }));
        } else {
          setUserDetails((prevState) => ({
            ...prevState,
            following: prevState.following.filter(
              (follower) => follower._id !== followerId
            ),
          }));
          setAllData((prevState) => ({
            ...prevState,
            following: prevState.following.filter(
              (follower) => follower._id !== followerId
            ),
          }));
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

  return (
    <>
      <nav className='border-b dark:border-slate-700'>
        <ul className='flex gap-5 text-sm text-center text-gray-600 capitalize font-semibold -mb-px dark:text-white/80'>
          <li className=''>
            <Link
              href='#'
              className={`inline-block py-5 border-b-2 ${
                showType === "followers"
                  ? "text-black border-black dark:text-white dark:border-white"
                  : "border-transparent"
              }`}
              onClick={() => setShowType("followers")}
            >
              followers {allData?.followers?.length}
            </Link>
          </li>
          <li className=''>
            <Link
              href='#'
              className={`inline-block py-5 border-b-2 ${
                showType === "following"
                  ? "text-black border-black dark:text-white dark:border-white"
                  : "border-transparent"
              }`}
              onClick={() => setShowType("following")}
            >
              following {allData?.following?.length}
            </Link>
          </li>
          {/* <li>
            <Link
              href="#"
              className="inline-block py-5 border-b-2 border-transparent"
            >
              Suggestions
            </Link>
          </li> */}
        </ul>
      </nav>
      {loading ? (
        <div className='grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80'>
          <FollowPeoplePlaceholder />
          <FollowPeoplePlaceholder />
        </div>
      ) : allData?.[showType]?.length > 0 ? (
        <div className='grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80'>
          {allData[showType].map((follow, index) => (
            <FollowCard
              key={index}
              allData={allData}
              follow={follow}
              handleFollow={handleFollow}
              loadingStates={loadingStates[follow._id]}
            />
          ))}
        </div>
      ) : (
        <div className='text-2xl font-semibold text-center text-black mt-16'>{`No ${showType}`}</div>
      )}

      {/* <div className="flex justify-center my-10">
        <button
          type="button"
          className="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2"
        >
          Load more...
        </button>
      </div> */}
    </>
  );
}
