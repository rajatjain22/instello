"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const PostContext = createContext(undefined);

const PostContextProvider = ({ children }) => {
  const path = usePathname();
  const isPublicPath = ["/login", "/register", "/forget-password"].includes(path);

  const [homePosts, setHomePosts] = useState([]);
  const [homePostsLoading, setHomePostsLoading] = useState(true);
  const [homePostPage, setHomePostPage] = useState(0);
  const [homePostHasMore, setHomePostHasMore] = useState(true);
  const [explorePosts, setExplorePosts] = useState([]);

 useEffect(() => {
    console.log("Post context API start");

    const getHomePost = async () => {
      try {
        const res = await fetch("/api/post/get");

        if (!res.ok) {
          throw new Error("Failed to fetch home posts");
        }

        const data = await res.json();

        if (data?.message) {
          setHomePosts(prevPosts => [...prevPosts, ...data.data]);
          setHomePostPage(prevPage => prevPage + 1);
          setHomePostHasMore(data.hasMore);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error while fetching home posts:", error.message);
      } finally {
        setHomePostsLoading(false);
      }
    };

    if (!isPublicPath) {
      getHomePost();
    }
  }, [isPublicPath]);

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
