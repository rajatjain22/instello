'use client'

import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext(undefined);

function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    console.log("User context api start");
    const fetchData = async () => {
      try {
        const response = await fetch("/api/users/profile/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data?.message) {
          setUserDetails(data.data);
        } else {
          throw new Error("Response did not contain expected data");
        }
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContextProvider, UserContext };
