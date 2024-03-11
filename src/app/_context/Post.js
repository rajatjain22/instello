"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const path = usePathname();
  const isPublicPath = path === "/login" || path === "/register";

  const [homePosts, setHomePosts] = useState([]);
  const [homePostsLoading, setHomePostsLoading] = useState(true);
  const [homePostPage, setHomePostPage] = useState(0);
  const [homePostHasMore, setHomePostHasMore] = useState(true);

  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    console.log("Post context api start");
    const getHomePost = () => {
      fetch("/api/post/get")
        .then((res) => res.json())
        .then((res) => {
          if (res?.message) {
            setHomePosts(res.data);
            setHomePostPage((presVal) => presVal + 1);
            setHomePostHasMore(res.hasMore);
          } else {
            console.log(res.error);
          }
        })
        .catch((error) => {
          console.log(error.message);
        })
        .finally(() => {
          setHomePostsLoading(false);
        });
    };
    if (!isPublicPath) {
      getHomePost();
    }
  }, []);

  return (
    <PostContext.Provider
      value={{
        homePosts,
        setHomePosts,
        homePostsLoading,
        setHomePostsLoading,
        homePostPage,
        setHomePostPage,
        homePostHasMore,
        setHomePostHasMore,

        explorePosts,
        setExplorePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContextProvider, PostContext };
