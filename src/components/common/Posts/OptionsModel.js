"use client";

import Link from "next/link";
import useOnClickOutside from "@/app/_hooks/useClickOutside";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@/app/_context/User";
import DeleteConfirmModel from "./DeleteConfirmModel";

function OptionsModel({ buttonRef, onClose, postId, userId }) {
  const modalRef = useRef(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [confirmModel, setConfirmModel] = useState({
    show: false,
    loading: false,
  });

  useOnClickOutside([modalRef, buttonRef], onClose);

  const hanleOpenConfirmModel = () => {
    setConfirmModel((presVal) => ({ ...presVal, show: true }));
  };

  const hanleCloseConfirmModel = () => {
    setConfirmModel((presVal) => ({ ...presVal, show: false }));
  };

  const handleDeletePost = async () => {
    try {
      setConfirmModel((presVal) => ({ ...presVal, loading: true }));

      const updatePosts = userDetails.posts.filter((e) => e._id !== postId);

      setUserDetails((presVal) => ({
        ...presVal,
        posts: updatePosts,
        postsCount: presVal.postsCount - 1,
      }));
      toast.success("Deleted");
      hanleCloseConfirmModel();
      onClose();
    } catch (error) {
      console.error("Post delete failed:", error.message);
      toast.error("Post delete failed");
    } finally {
      setConfirmModel((presVal) => ({ ...presVal, loading: false }));
    }
  };

  return (
    <div ref={modalRef} className="w-[245px] top-10 right-7 optionModel">
      <nav>
        {userDetails._id === userId ? (
          <>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48z"
                ></path>
              </svg>
              Add to favorites
            </Link>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M80 464V68.14a8 8 0 0 1 4-6.9C91.81 56.66 112.92 48 160 48c64 0 145 48 192 48a199.53 199.53 0 0 0 77.23-15.77 2 2 0 0 1 2.77 1.85v219.36a4 4 0 0 1-2.39 3.65C421.37 308.7 392.33 320 352 320c-48 0-128-32-192-32s-80 16-80 16"
                ></path>
              </svg>
              Report this post
            </Link>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40m160-64-80-80-80 80m80 193V48"
                ></path>
              </svg>
              Share your profile
            </Link>
            <hr />
            <Link
              href="#"
              onClick={hanleOpenConfirmModel}
              className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
            >
              {/* <IoStopCircleOutline className="text-xl shrink-0 md" /> */}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path>
              </svg>
              Delete
            </Link>
          </>
        ) : (
          <>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M352 48H160a48 48 0 0 0-48 48v368l144-128 144 128V96a48 48 0 0 0-48-48z"
                ></path>
              </svg>
              Add to favorites
            </Link>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M80 464V68.14a8 8 0 0 1 4-6.9C91.81 56.66 112.92 48 160 48c64 0 145 48 192 48a199.53 199.53 0 0 0 77.23-15.77 2 2 0 0 1 2.77 1.85v219.36a4 4 0 0 1-2.39 3.65C421.37 308.7 392.33 320 352 320c-48 0-128-32-192-32s-80 16-80 16"
                ></path>
              </svg>
              Report this post
            </Link>
            <Link href="#">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M336 192h40a40 40 0 0 1 40 40v192a40 40 0 0 1-40 40H136a40 40 0 0 1-40-40V232a40 40 0 0 1 40-40h40m160-64-80-80-80 80m80 193V48"
                ></path>
              </svg>
              Share your profile
            </Link>
            <hr />
            <Link
              href="#"
              className="text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50"
            >
              {/* <IoStopCircleOutline className="text-xl shrink-0 md" /> */}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="text-xl shrink-0 md"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></path>
              </svg>
              Unfollow
            </Link>
          </>
        )}
      </nav>

      <DeleteConfirmModel
        isOpen={confirmModel.show}
        onClose={hanleCloseConfirmModel}
        loading={confirmModel.loading}
        handleDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default OptionsModel;
