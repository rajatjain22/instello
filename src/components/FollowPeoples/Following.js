"use client";

import { UserContext } from "@/app/_context/User";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Following() {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const { id, type } = useParams();
  const [showType, setShowType] = useState("");
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    if (userDetails && userDetails._id === id) {
      setAllData(userDetails);
      setShowType(type);
    } else {
      fetch(`/api/users/profile/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setShowType(type);
          setAllData(res.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, []);

  const handleFollow = (followerId, val) => {
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
        const data = val === "follow" ? true : false;
        if (data && allData) {
          const dd = allData.followers.find((e) => e._id === followerId);

          setUserDetails((presVal) => ({
            ...presVal,
            following: [...presVal.following, dd],
          }));

          setAllData((presVal) => ({
            ...presVal,
            following: [...presVal.following, dd],
          }));
        } else {
          setUserDetails((presVal) => ({
            ...presVal,
            following: presVal.following.filter((e) => e._id !== followerId),
          }));
          setAllData((presVal) => ({
            ...presVal,
            following: presVal.following.filter((e) => e._id !== followerId),
          }));
        }
        toast.success(val);
      })
      .catch((err) => console.log(err.message));
  };

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
              followers {allData?.followers?.length}
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
      {allData?.[showType]?.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-2 mt-5 mb-2 text-xs font-normal text-gray-500 dark:text-white/80">
          {allData[showType].map((follow, index) => {
            const checkFollow = allData.following.some(
              (item) => item._id === follow._id
            );
            return (
              <div
                key={index}
                className="bg-white flex gap-4 items-center flex-wrap justify-between p-5 rounded-lg shadow-sm border1 dark:bg-dark2"
              >
                <Link href="profile.html">
                  <img
                    src={follow.avatar}
                    alt=""
                    className="rounded-full lg:w-16 lg:h-16 w-10 h-10"
                  />
                </Link>
                <div className="flex-1">
                  <Link href="profile.html">
                    <h4 className="font-semibold text-sm text-black dark:text-white">
                      {follow.fullName}
                    </h4>
                  </Link>
                  <div className="mt-0.5">
                    {" "}
                    {follow.followers?.length} followers{" "}
                  </div>
                </div>

                {userDetails._id !== follow._id &&
                  (checkFollow ? (
                    <button
                      type="button"
                      className="button bg-secondery rounded-full py-1.5 font-semibold"
                      onClick={() => handleFollow(follow._id, "unfollow")}
                    >
                      remove
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                      onClick={() => handleFollow(follow._id, "follow")}
                    >
                      Follow <span className="ripple-overlay"></span>
                    </button>
                  ))}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-2xl font-semibold text-center text-black mt-16">{`No ${showType}`}</div>
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
