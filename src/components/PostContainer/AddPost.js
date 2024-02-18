"use client";

import { UserContext } from "@/app/context/User";
import { useContext, useRef, useState } from "react";
import ImageSlider from "./ImageSlider";
import toast from "react-hot-toast";

export default function AddPost({ setPosts }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const [postText, setPostText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filesRef, setFileRef] = useState([]);
  const inputRef = useRef(null);

  function auto_grow(element) {
    element.target.style.height = "10px";
    element.target.style.height = element.target.scrollHeight + "px";
  }

  const handlePost = async () => {
    const formData = new FormData();
    filesRef.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("postText", postText); // Assuming postText is defined somewhere
    const requsetData = {
      method: "POST",
      body: formData,
    };
    fetch("/api/post/upload", requsetData)
      .then((res) => res.json())
      .then((res) => {
        if(res.data.user === userDetails._id){
          res.data.user = userDetails;
          setUserDetails(presVal=>({...presVal, posts:[res.data, ...presVal.posts]}))
          setPosts((posts) => [res.data, ...posts]);
          setFileRef([]);
          setPostText("");
          toast.success("Post Added Successfully");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-1 text-sm font-medium border1 w-full">
        <div className="">
          <textarea
            // cols="30"
            onChange={(e) => setPostText(e.target.value)}
            value={postText}
            onInput={auto_grow}
            placeholder="What's on your mind? "
            className="border-0 w-full resize-none bg-slate-100 focus-visible:outline-none px-2.5 pt-2.5 rounded-lg dark:text-white"
          />
        </div>

        <div id="media" className="">
          <ImageSlider
            filesRef={filesRef}
            setFileRef={setFileRef}
            isFeed={false}
          />
        </div>

        <div className="flex  justify-between flex-wrap gap-2 max-[319px]:justify-end">
          <div className="flex gap-2 text-[#03A9F4]">
            <input
              disabled={filesRef?.length >= 4}
              accept="image/*,video/*"
              ref={inputRef}
              multiple
              onChange={(e) => {
                if (filesRef.length <= 4) {
                  setFileRef([...filesRef, ...e.target.files]);
                }
              }}
              type="file"
              name="image"
              id="uploadImage"
              className="hidden"
            />
            <div
              className="p-2 bg-sky-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer"
              onClick={() => inputRef.current.click()}
              sx={{
                filter: "drop-shadow(0px 0px 3px rgb(47 223 154 / 0.5))",
                cursor: filesRef?.length >= 4 ? "not-allowed" : "pointer",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 fill-sky-600"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div
              className="p-2 bg-pink-100 hover:bg-opacity-80 transition-all rounded-lg cursor-pointer"
              sx={{
                filter: "drop-shadow(0px 0px 3px rgb(0 168 240 / 0.5))",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 fill-pink-600"
              >
                <path d="M3.25 4A2.25 2.25 0 001 6.25v7.5A2.25 2.25 0 003.25 16h7.5A2.25 2.25 0 0013 13.75v-7.5A2.25 2.25 0 0010.75 4h-7.5zM19 4.75a.75.75 0 00-1.28-.53l-3 3a.75.75 0 00-.22.53v4.5c0 .199.079.39.22.53l3 3a.75.75 0 001.28-.53V4.75z"></path>
              </svg>
            </div>
          </div>

          <button
            onClick={handlePost}
            className="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
          >
            {loading ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
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
                Loading...
              </>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
