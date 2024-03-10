"use client";

import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "@/app/_context/User";
import LoginForm from "@/components/Login/LoginForm";
import JoinNowLink from "@/components/Login/JoinNowLink";
import SocialLoginButtons from "@/components/Login/SocialLoginButtons";
import { useRouter } from "next/navigation";
import { PostContext } from "@/app/_context/Post";
import Link from "next/link";

export default function Login() {
  const { setUserDetails } = useContext(UserContext);
  const { setHomePosts, setHomePostsLoading } = useContext(PostContext);

  const router = useRouter();
  const [loginBtnLoading, setLoginBtnLoading] = useState(false);
  const [formType, setFormType] = useState(true);

  const handleLoginFormSubmit = async (formData) => {
    const { fullName, username, email, password } = formData;

    const requiredFields = formType
      ? ["email", "password"]
      : ["fullName", "username", "email", "password"];

    if (!requiredFields.every((field) => formData[field])) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoginBtnLoading(true);
    const apiEndpoint = `/api/users/${formType ? "login" : "register"}`;
    const requestOptions = {
      method: "POST",
      body: JSON.stringify(formData),
    };

    try {
      const response = await fetch(apiEndpoint, requestOptions);
      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.error);

      if (formType) {
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
      } else {
        setFormType(true);
      }

      toast.success(`${formType ? "Login" : "Register"} Successful`);
    } catch (error) {
      console.error("Login Failed", error);
      toast.error(error.message);
    } finally {
      setLoginBtnLoading(false);
      setHomePostsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
        <div className="relative w-6 h-16 bg-fuchsia-100 px-3 rounded-2xl p-2.5 my-5 mx-auto">
          {/* Your image component */}
        </div>
        <LoginForm
          formType={formType}
          onSubmit={handleLoginFormSubmit}
          loading={loginBtnLoading}
        />
        <Link href="#">
          <div className="text-sm text-right text-gray-400 py-4">
            Forget password
          </div>
        </Link>
        <SocialLoginButtons />
        <JoinNowLink formType={formType} setFormType={setFormType} />
      </div>
    </div>
  );
}
