"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext(undefined);

function UserContextProvider({ children }) {
  const path = usePathname();
  const [userDetails, setUserDetails] = useState(null);

  const isPublicPath = ["/login", "/register", "/forget-password"].includes(path);
  
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
  }, [isPublicPath]);

  return (
     <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
