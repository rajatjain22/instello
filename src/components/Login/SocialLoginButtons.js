"use client";

import { IoLogoApple, IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
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
          headers: { 'x-api-token': `${val.access_token}` },
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
        <IoLogoFacebook />
      </button>
      <button onClick={googleLogin}>
        <IoLogoGoogle />
      </button>
      <button>
        <IoLogoApple />
      </button>
    </div>
  );
}
