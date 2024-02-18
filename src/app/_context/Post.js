"use client";

import { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [homePosts, setHomePosts] = useState([]);
  const [explorePosts, setExplorePosts] = useState([]);
  const [modalImage, setModalImage] = useState({
    url: "",
    open: false,
  });
  const [commentModal, setCommentModal] = useState({
    open: false,
    post: {},
  });
  const [comment, setComment] = useState({
    text: "",
  });

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        modalImage,
        setModalImage,
        commentModal,
        setCommentModal,
        comment,
        setComment,
        explorePosts,
        setExplorePosts,
        homePosts,
        setHomePosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContextProvider, PostContext };
