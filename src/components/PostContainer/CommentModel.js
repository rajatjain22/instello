import { UserContext } from "@/app/_context/User";
import ModelBox from "@/components/ModelBox/ModelBox";
import { formatTimestamp } from "@/helpers/all";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserPlaceholder } from "../Placeholders/UserPlaceholder";

export default function CommentModel({
  isOpen,
  onClose,
  post,
  user,
  handleCommentModel,
}) {
  const { userDetails } = useContext(UserContext);
  const [comment, setComment] = useState({
    value: "",
    comments: [],
    pageLoading: false,
    btnLoading: false,
  });

  const fetchComments = async () => {
    try {
      setComment((presVal) => ({ ...presVal, pageLoading: true }));
      const res = await fetch(`/api/post/comment/${post._id}`);
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const resJson = await res.json();
      setComment((presVal) => ({ ...presVal, comments: resJson.data }));
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setComment((presVal) => ({ ...presVal, pageLoading: false }));
    }
  };

  useEffect(() => {
    fetchComments();
    return () => {};
  }, []);

  const handleSubmitComment = useCallback(
    (e) => {
      e.preventDefault();
      setComment((presVal) => ({
        ...presVal,
        btnLoading: true,
      }));
      const request = {
        method: "POST",
        body: JSON.stringify({ comment: comment.value }),
      };

      fetch(`/api/post/comment/${post._id}`, request)
        .then((res) => res.json())
        .then((res) => {
          const newComment = {
            _id: res.id,
            post: post._id,
            user: {
              _id: userDetails._id,
              username: userDetails.username,
              fullName: userDetails.fullName,
              avatar: userDetails.avatar,
            },
            comment: comment.value,
            createdAt: Date.now(),
          };

          setComment((presVal) => ({
            ...presVal,
            value: "",
            comments: [newComment, ...presVal.comments],
          }));
          handleCommentModel();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setComment((presVal) => ({
            ...presVal,
            btnLoading: false,
          }));
        });
    },
    [comment.value, post._id]
  );

  return (
    <ModelBox isOpen={isOpen} onClose={onClose}>
      <div className="sm:px-4 sm:py-3 p-2.5 border-b border-gray-100 flex items-center gap-3 dark:border-slate-700/40">
        <div className="relative w-9 h-9 mt-1">
          <Image
            className="rounded-full"
            src={user.avatar}
            alt="Profile picture"
            fill={true}
            loading="lazy"
          />
        </div>
        <div>{user.username}</div>
      </div>
      <div className="bg-white flex flex-col text-black gap-3 sm:px-4 sm:py-3 p-2.5 h-72 overflow-y-scroll">
        {comment.pageLoading ? (
          <div>
            <UserPlaceholder />
            <UserPlaceholder />
            <UserPlaceholder />
          </div>
        ) : comment.comments.length ? (
          comment.comments.map((val, index) => (
            <div className="flex items-start gap-3 relative" key={index}>
              <div className="relative w-9 h-9 mt-1">
                <Image
                  className="rounded-full"
                  src={val.user.avatar}
                  alt="Picture of the author"
                  fill={true}
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <a
                    href="#"
                    className="text-black font-medium inline-block dark:text-white"
                  >
                    {val.user.fullName}
                  </a>
                  <div className="text-gray-400 text-xs font-normal">
                    {formatTimestamp(val?.createdAt)}
                  </div>
                </div>
                <p className="mt-0.5 font-normal whitespace-pre-wrap">{val.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center text-lg">No comments</div>
        )}
      </div>
      <div className="sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40">
        <div className="relative w-9 h-9 mt-1">
          <Image
            className="rounded-full"
            src={userDetails.avatar}
            alt="Profile picture"
            fill={true}
            loading="lazy"
          />
        </div>

        <div className="flex-1 relative overflow-hidden h-10">
          <textarea
            placeholder="Add Comment...."
            rows={1}
            cols={40}
            className="w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent focus:outline-none"
            value={comment.value}
            onChange={(e) => {
              setComment({ ...comment, value: e.target.value });
            }}
          />
        </div>

        {comment.btnLoading ? (
          <button
            className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery cursor-not-allowed"
            disabled
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
          </button>
        ) : (
          <button
            type="submit"
            className="text-sm rounded-full py-1.5 px-3.5 bg-secondery"
            onClick={handleSubmitComment}
          >
            Comment
          </button>
        )}
      </div>
    </ModelBox>
  );
}
