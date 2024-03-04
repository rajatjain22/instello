import { UserContext } from "@/app/_context/User";
import ModelBox from "@/components/ModelBox/ModelBox";
import Image from "next/image";
import { useCallback, useContext, useEffect, useState } from "react";

export default function CommentModel({
  isOpen,
  onClose,
  post,
  handleCommentModel,
}) {
  const { userDetails } = useContext(UserContext);
  const [comment, setComment] = useState({
    value: "",
    comments: [],
    pageLoading: false,
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
            value:'',
            comments: [newComment, ...presVal.comments],
          }));
          handleCommentModel();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [comment.value, post._id] // Assuming post._id is the unique identifier for post
  );

  return (
    <ModelBox isOpen={isOpen} onClose={onClose}>
      <div className='bg-white flex flex-col gap-2 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
        {comment.pageLoading ? (
          <div>Loading...</div>
        ) : (
          comment.comments.map((val, index) => (
            <div className='flex items-start gap-3 relative' key={index}>
              <div className='relative w-6 h-6 mt-1'>
                <Image
                  className='rounded-full'
                  src={val.user.avatar}
                  alt='Picture of the author'
                  fill={true}
                  loading='lazy'
                />
              </div>
              <div className='flex-1'>
                <a
                  href='profile.html'
                  className='text-black font-medium inline-block dark:text-white'
                >
                  {val.user.fullName}
                </a>
                <p className='mt-0.5'>{val.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className='sm:px-4 sm:py-3 p-2.5 border-t border-gray-100 flex items-center gap-1 dark:border-slate-700/40'>
        <div className='relative w-6 h-6 mt-1'>
          <Image
            className='rounded-full'
            src={userDetails.avatar}
            alt='Profile picture'
            fill={true}
            loading='lazy'
          />
        </div>

        <div className='flex-1 relative overflow-hidden h-10'>
          <textarea
            placeholder='Add Comment....'
            rows='1'
            className='w-full resize-none !bg-transparent px-4 py-2 focus:!border-transparent focus:!ring-transparent focus:outline-none'
            value={comment.value}
            onChange={(e) => {
              setComment({ ...comment, value: e.target.value });
            }}
          />
        </div>

        <button
          type='submit'
          className='text-sm rounded-full py-1.5 px-3.5 bg-secondery'
          onClick={handleSubmitComment}
        >
          Replay
        </button>
      </div>
    </ModelBox>
  );
}
