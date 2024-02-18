"use client";

import { UserContext } from "@/app/context/User";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { IoLogoApple, IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";

export default function Login() {
  const { setUserDetails } = useContext(UserContext);

  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email && !password) {
      toast.error("Please fill all required fields");
      return;
    }
    const requestData = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    };
    try {
      const response = await fetch("/api/users/login", requestData);
      const resJson = await response.json();
      if (!response.ok) throw new Error(resJson.error);
      setUserDetails(resJson.user);
      toast.success("Login Successfull");
      router.push("/");
    } catch (error) {
      console.log("Login Failed", error.message);
      toast.error("Login Failed");
    }
  };

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className='max-w-sm mx-auto md:px-10 p-4 w-full'>
        <div>
          <div className='relative w-auto h-16 flex justify-center mb-12'>
            <Image
              className='shrink-0 bg-fuchsia-100 px-3 rounded-2xl p-2.5'
              src='/'
              alt='Picture of the author'
              fill={true}
              loading='lazy'
            />
          </div>

          <form method='POST' className='space-y-3' onSubmit={formSubmit}>
            <input
              id='email'
              name='email'
              type='text'
              placeholder='Email'
              className='bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none'
              onChange={handleChange}
            />
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              className='bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none'
              onChange={handleChange}
            />

            <Link href='#' className=''>
              <div className='text-sm text-right text-gray-400 py-4'>
                Forget password
              </div>
            </Link>

            <button
              type='submit'
              className='font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150 uk-scrollspy-inview '
            >
              <span>Sign in</span>
            </button>

            <div className='flex gap-3 justify-center text-2xl py-5 text-slate-500 uk-scrollspy-inview '>
              <Link href='#'>
                <IoLogoFacebook />
              </Link>
              <Link href='#'>
                <IoLogoGoogle />
              </Link>
              <Link href='#'>
                <IoLogoApple />
              </Link>
            </div>

            <div className='space-x-2 text-sm text-center text-slate-400 dark:text-white/70 uk-scrollspy-inview '>
              <span> No account? </span>
              <span>—</span>
              <Link
                href='/register'
                className='text-gray-600 hover:text-gray-500'
              >
                Join now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
