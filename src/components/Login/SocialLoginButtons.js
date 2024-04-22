"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/app/_context/User";
import { PostContext } from "@/app/_context/Post";
import toast from "react-hot-toast";

export default function SocialLoginButtons() {
  const router = useRouter();
  const { setUserDetails } = useContext(UserContext);
  const { setHomePosts, setHomePostsLoading } = useContext(PostContext);

  const googleLogin = useGoogleLogin({
    onSuccess: async (val) => {
      try {
        const res = await fetch("/api/users/google", {
          headers: { "x-api-token": `${val.access_token}` },
        });

        if (!res.ok) {
          throw new Error("API error");
        }
        const resJson = await res.json();
        if (resJson.error) {
          throw new Error(resJson.error);
        }

        router.push("/");

        const [userDataResponse, postDataResponse, homePostDataResponse] =
          await Promise.all([
            fetch("/api/users/profile/user"),
            fetch("/api/post/user"),
            fetch("/api/post/get"),
          ]);

        if (
          !userDataResponse.ok ||
          !postDataResponse.ok ||
          !homePostDataResponse.ok
        ) {
          throw new Error("Network response was not ok");
        }

        const [userData, postData, homepostData] = await Promise.all([
          userDataResponse.json(),
          postDataResponse.json(),
          homePostDataResponse.json(),
        ]);

        setUserDetails({ ...userData.data, posts: postData.data });
        setHomePosts(homepostData.data);

        toast.success(`Login Successful`);
      } catch (error) {
        toast.error(`Login Failed`);
        console.log(error.message);
      }
    },
    onError: () => {
      toast.error(`Login Failed`);
      console.log("Login Failed");
    },
  });

  return (
    <div className='flex gap-3 justify-center text-2xl py-5 text-slate-500 uk-scrollspy-inview '>
      <button>
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            d='M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z'
          ></path>
        </svg>
      </button>
      <button onClick={googleLogin}>
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='m473.16 221.48-2.26-9.59H262.46v88.22H387c-12.93 61.4-72.93 93.72-121.94 93.72-35.66 0-73.25-15-98.13-39.11a140.08 140.08 0 0 1-41.8-98.88c0-37.16 16.7-74.33 41-98.78s61-38.13 97.49-38.13c41.79 0 71.74 22.19 82.94 32.31l62.69-62.36C390.86 72.72 340.34 32 261.6 32c-60.75 0-119 23.27-161.58 65.71C58 139.5 36.25 199.93 36.25 256s20.58 113.48 61.3 155.6c43.51 44.92 105.13 68.4 168.58 68.4 57.73 0 112.45-22.62 151.45-63.66 38.34-40.4 58.17-96.3 58.17-154.9 0-24.67-2.48-39.32-2.59-39.96z'></path>
        </svg>
      </button>
      <button>
        <svg
          stroke='currentColor'
          fill='currentColor'
          strokeWidth='0'
          viewBox='0 0 512 512'
          height='1em'
          width='1em'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M349.13 136.86c-40.32 0-57.36 19.24-85.44 19.24-28.79 0-50.75-19.1-85.69-19.1-34.2 0-70.67 20.88-93.83 56.45-32.52 50.16-27 144.63 25.67 225.11 18.84 28.81 44 61.12 77 61.47h.6c28.68 0 37.2-18.78 76.67-19h.6c38.88 0 46.68 18.89 75.24 18.89h.6c33-.35 59.51-36.15 78.35-64.85 13.56-20.64 18.6-31 29-54.35-76.19-28.92-88.43-136.93-13.08-178.34-23-28.8-55.32-45.48-85.79-45.48z'></path>
          <path d='M340.25 32c-24 1.63-52 16.91-68.4 36.86-14.88 18.08-27.12 44.9-22.32 70.91h1.92c25.56 0 51.72-15.39 67-35.11 14.72-18.77 25.88-45.37 21.8-72.66z'></path>
        </svg>
      </button>
    </div>
  );
}
