"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const path = usePathname();
  const isPublicPath = path === "/login" || path === "/register";

  const [posts, setPosts] = useState([]);

  const [homePosts, setHomePosts] = useState([]);
  const [homePostsLoading, setHomePostsLoading] = useState(true);

  const [explorePosts, setExplorePosts] = useState([]);

  useEffect(() => {
    console.log('Post context api start')
    const getHomePost = () => {
      fetch("/api/post/get")
        .then((res) => res.json())
        .then((res) => {
          if (res?.message) {
            console.log(res);
            setHomePosts(res.data);
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
        posts,
        setPosts,
        explorePosts,
        setExplorePosts,
        homePosts,
        homePostsLoading,
        setHomePostsLoading,
        setHomePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContextProvider, PostContext };
