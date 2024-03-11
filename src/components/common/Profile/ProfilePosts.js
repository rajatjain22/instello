import PostList from "@/components/common/Posts/PostList";
import { useContext, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import PostImage from "../Posts/PostImage";
import { UserContext } from "@/app/_context/User";

function ProfilePosts({ profile }) {
  const { userDetails } = useContext(UserContext);
  const [stickyTabChange, setStickyTabChange] = useState("images-posts");

  return (
    <div className="mt-10 flex flex-col gap-8 max-w-[600px] my-0 mx-auto">
      {/* <!-- sticky tabs --> */}
      <nav className="text-sm text-center text-gray-500 capitalize font-semibold dark:text-white">
        <ul className="flex gap-2 justify-center border-t dark:border-slate-700">
          <li>
            <button
              onClick={() => setStickyTabChange("images-posts")}
              className={`flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent ${
                stickyTabChange === "images-posts"
                  ? " aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                  : ""
              }`}
              aria-expanded="true"
            >
              <IoCameraOutline className="text-lg" />
              Images
            </button>
          </li>
          <li>
            <button
              onClick={() => setStickyTabChange("all-posts")}
              className={`flex items-center gap-1 p-4 py-2.5 -mb-px border-t-2 border-transparent ${
                stickyTabChange === "all-posts"
                  ? " aria-expanded:text-black aria-expanded:border-black aria-expanded:dark:text-white aria-expanded:dark:border-white"
                  : ""
              }`}
              aria-expanded="true"
            >
              <IoCameraOutline className="text-lg" />
              All Posts
            </button>
          </li>
        </ul>
      </nav>

      {stickyTabChange === "images-posts" ? (
        <PostList posts={profile?.posts} />
      ) : stickyTabChange === "all-posts" && profile?.posts?.length ? (
        profile?.posts?.map((post, index) => (
          <PostImage key={index} user={userDetails} post={post} />
        ))
      ) : (
        <div className="flex items-center justify-center h-48 py-3">
          <h1 className="text-xl font-bold text-black dark:text-white">
            No Posts
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProfilePosts;
