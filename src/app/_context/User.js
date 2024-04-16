"use client";

import { connectSocket, socketData } from "@/helpers/socket";
import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext(undefined);

function UserContextProvider({ children }) {
  const path = usePathname();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isPublicPath =
    path === "/login" || path === "/register" || path === "/forget-password";

  useEffect(() => {
    console.log("User context api start");

    const fetchData = async () => {
      try {
        const [userDataResponse, postDataResponse] = await Promise.all([
          fetch("/api/users/profile/user"),
          fetch("/api/post/user"),
        ]);

        if (!userDataResponse.ok || !postDataResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const [userData, postData] = await Promise.all([
          userDataResponse.json(),
          postDataResponse.json(),
        ]);

        if (userData?.message && postData?.message) {
          setUserDetails({ ...userData.data, posts: postData.data });
          if (!socketData && userData.data._id) {
            connectSocket(userData.data._id, setSocket);
          }

          socketData?.on("getUsers", (users) => {
            console.log("activeUsers ==> ", users);
          });
        } else {
          throw new Error("Response did not contain expected data");
        }
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      }
    };

    if (!isPublicPath) {
      fetchData();
    }
  }, [isPublicPath, isLoggedIn]);

  return (
    <UserContext.Provider
      value={{ userDetails, setUserDetails, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
