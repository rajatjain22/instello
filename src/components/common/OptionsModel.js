import {
  IoBookmarkOutline,
  IoFlagOutline,
  IoShareOutline,
  IoStopCircleOutline,
} from "react-icons/io5";
import Link from "next/link";
import useOnClickOutside from "@/app/_hooks/useClickOutside";
import { useContext, useRef } from "react";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { UserContext } from "@/app/_context/User";

function OptionsModel({ buttonRef, onClose, postId, userId }) {
  const modalRef = useRef(null);
  const { userDetails, setUserDetails } = useContext(UserContext);
  useOnClickOutside([modalRef, buttonRef], onClose);

  const handleDeletePost = async () => {
    try {
      // const res = await fetch(`/api/post/get/${postId}`, { method: "DELETE" });

      // if (!res.ok) {
      //   throw new Error(`Failed to delete post: ${res.statusText}`);
      // }

      // const resJson = await res.json();
      const updatePosts = userDetails.posts.filter((e) => e._id !== postId);

      setUserDetails((presVal) => ({
        ...presVal,
        posts: updatePosts,
        postsCount: presVal.postsCount - 1,
      }));
      toast.success("Deleted");
      onClose();
    } catch (error) {
      console.error("Post delete failed:", error.message);
      toast.error("Post delete failed");
    }
  };

  return (
    <div ref={modalRef} className='w-[245px] top-10 right-7 optionModel'>
      <nav>
        {userDetails._id === userId ? (
          <>
            <Link href='#'>
              <IoBookmarkOutline className='text-xl shrink-0 md' /> Add to
              favorites
            </Link>
            <Link href='#'>
              <IoFlagOutline className='text-xl shrink-0 md' /> Report this post
            </Link>
            <Link href='#'>
              <IoShareOutline className='text-xl shrink-0 md' /> Share your
              profile
            </Link>
            <hr />
            <Link
              href='#'
              onClick={handleDeletePost}
              className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
            >
              {/* <IoStopCircleOutline className="text-xl shrink-0 md" /> */}
              <MdOutlineDelete className='text-xl shrink-0 md' />
              Delete
            </Link>
          </>
        ) : (
          <>
            <Link href='#'>
              <IoBookmarkOutline className='text-xl shrink-0 md' /> Add to
              favorites
            </Link>
            <Link href='#'>
              <IoFlagOutline className='text-xl shrink-0 md' /> Report this post
            </Link>
            <Link href='#'>
              <IoShareOutline className='text-xl shrink-0 md' /> Share your
              profile
            </Link>
            <hr />
            <Link
              href='#'
              onClick={handleDeletePost}
              className='text-red-400 hover:!bg-red-50 dark:hover:!bg-red-500/50'
            >
              {/* <IoStopCircleOutline className="text-xl shrink-0 md" /> */}
              <MdOutlineDelete className='text-xl shrink-0 md' />
              Unfollow
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default OptionsModel;
