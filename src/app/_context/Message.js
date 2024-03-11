"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useEffect, useState } from "react";

const MessageContext = createContext(undefined);

function MessageContextProvider({ children }) {
  const path = usePathname();
  const [userDetails, setUserDetails] = useState(null);
  const isPublicPath = path === "/login" || path === "/register";

  useEffect(() => {
    console.log("User context api start");

    const fetchData = () => {
      fetch("/api/conversation")
        .then((res) => res.json())
        .then((res) => {
          if (res?.message) {
            console.log(res);
          } else {
            console.log(res.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
        });
    };

    if (!isPublicPath) {  
      fetchData();
    }
  }, []);

  return (
    <MessageContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </MessageContext.Provider>
  );
}

export { MessageContextProvider, MessageContext };
