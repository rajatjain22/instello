"use client";

import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import FollowCard from "./FollowCard";
import { FollowPeoplePlaceholder } from "../Placeholders/FollowPeoplePlaceholder";
import { notFound } from 'next/navigation'
import NotFoundCatchAll from "@/app/[...not_found]/page";

export default function Following() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { id, type } = useParams();
  const [showType, setShowType] = useState("");
  const [allData, setAllData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingStates, setLoadingStates] = useState({});

  const [notFound, setNotFound] = useState(false);

  const fetchData = async (action) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/users/profile/${id}/${action}`);
      if (res.status === 404) {
        setNotFound(true);
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

  useEffect(() => {
    setShowType(type);
  }, [type]);

  useEffect(() => {
    fetchData(showType);
  }, [showType]);

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
        const updateFollowStatus = (prevState, index, val, showType) => {
          const countField =
            showType === "following" ? "followingCount" : "followersCount";

          const updatedUserData = [...prevState[showType]];

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
            [showType]: updatedUserData,
            [countField]: prevState[countField] + countChange,
          };
        };

        const followUserIndex = allData?.[showType]?.findIndex(
          (e) => e._id === followerId
        );

        if (followUserIndex !== -1 && followUserIndex !== undefined) {
          setUserDetails((prevState) => ({
            ...prevState,
            followingCount:
              prevState.followingCount + (val === "follow" ? 1 : -1),
          }));

          setAllData((prevState) =>
            updateFollowStatus(prevState, followUserIndex, val, showType)
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
        // const followUserIndex = allData[showType].findIndex(
        //   (e) => e._id === followerId
        // );

        // if (followUserIndex !== -1) {
        //   if (val === "follow") {
        //     if (showType === "following") {
        //       setUserDetails((prevState) => ({
        //         ...prevState,
        //         followingCount: prevState.followingCount + 1,
        //       }));
        //       setAllData((prevState) => {
        //         let updatedUserData = [...prevState.following];
        //         updatedUserData[followUserIndex] = {
        //           ...updatedUserData[followUserIndex],
        //           followed_by_viewer: true,
        //         };

        //         return {
        //           ...prevState,
        //           following: updatedUserData,
        //           followingCount:
        //             userDetails._id === allData._id
        //               ? prevState.followingCount + 1
        //               : prevState.followingCount,
        //         };
        //       });
        //     } else {
        //       setUserDetails((prevState) => ({
        //         ...prevState,
        //         followersCount: prevState.followersCount + 1,
        //       }));

        //       setAllData((prevState) => {
        //         let updatedUserData = [...prevState.followers];
        //         updatedUserData[followUserIndex] = {
        //           ...updatedUserData[followUserIndex],
        //           followed_by_viewer: true,
        //         };

        //         return {
        //           ...prevState,
        //           followers: updatedUserData,
        //           followersCount:
        //             userDetails._id === allData._id
        //               ? prevState.followersCount + 1
        //               : prevState.followersCount,
        //         };
        //       });
        //     }
        //   } else if (val === "unfollow") {
        //     if (showType === "following") {
        //       setUserDetails((prevState) => ({
        //         ...prevState,
        //         followingCount: prevState.followingCount - 1,
        //       }));

        //       setAllData((prevState) => {
        //         let updatedUserData = [...prevState.following];
        //         updatedUserData[followUserIndex] = {
        //           ...updatedUserData[followUserIndex],
        //           followed_by_viewer: false,
        //         };

        //         return {
        //           ...prevState,
        //           following: updatedUserData,
        //           followingCount:
        //             userDetails._id === allData._id
        //               ? prevState.followingCount - 1
        //               : prevState.followingCount,
        //         };
        //       });
        //     } else {
        //       setUserDetails((prevState) => ({
        //         ...prevState,
        //         followersCount: prevState.followersCount - 1,
        //       }));

        //       setAllData((prevState) => {
        //         let updatedUserData = [...prevState.followers];
        //         updatedUserData[followUserIndex] = {
        //           ...updatedUserData[followUserIndex],
        //           followed_by_viewer: false,
        //         };

        //         return {
        //           ...prevState,
        //           followers: updatedUserData,
        //           followersCount:
        //             userDetails._id === allData._id
        //               ? prevState.followersCount - 1
        //               : prevState.followersCount,
        //         };
        //       });
        //     }
        //   }
        // } else {
        //   if (val === "remove") {
        //     setUserDetails((prevState) => ({
        //       ...prevState,
        //       followersCount: prevState.followersCount - 1,
        //     }));
        //     setAllData((prevState) => {
        //       let updatedUserData = prevState.followers.filter(
        //         (e) => e._id !== followerId
        //       );

        //       return {
        //         ...prevState,
        //         followers: updatedUserData,
        //         followersCount: prevState.followersCount - 1,
        //       };
        //     });
        //   }
        // }
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

  if(notFound){
    return <NotFoundCatchAll />
  }

  return (
    <>
      <nav className="border-b dark:border-slate-700">
        <ul className="flex gap-5 text-sm text-center text-gray-600 capitalize font-semibold -mb-px dark:text-white/80">
          <li className="">
            <Link
              href="#"
              className={`inline-block py-5 border-b-2 ${
                showType === "followers"
                  ? "text-black border-black dark:text-white dark:border-white"
                  : "border-transparent"
              }`}
              onClick={() => setShowType("followers")}
            >
              followers {allData?.followersCount}
            </Link>
          </li>
          <li className="">
            <Link
              href="#"
              className={`inline-block py-5 border-b-2 ${
                showType === "following"
                  ? "text-black border-black dark:text-white dark:border-white"
                  : "border-transparent"
              }`}
              onClick={() => setShowType("following")}
            >
              following {allData?.followingCount}
            </Link>
          </li>
        </ul>
      </nav>
      {loading ? (
        <div className="grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80">
          <FollowPeoplePlaceholder />
          <FollowPeoplePlaceholder />
        </div>
      ) : allData?.[showType]?.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80">
          {allData[showType].map((follow, index) => (
            <FollowCard
              key={follow._id}
              follow={follow}
              handleFollow={handleFollow}
              loadingStates={loadingStates[follow._id]}
              showType={showType}
            />
          ))}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-center text-black mt-16">{`No ${showType}`}</div>
      )}

      <div className="flex justify-center my-10">
        <button
          type="button"
          className="bg-white py-2 px-5 rounded-full shadow-md font-semibold text-sm dark:bg-dark2"
        >
          Load more...
        </button>
      </div>
    </>
  );
}
