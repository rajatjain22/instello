"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoLogoApple, IoLogoFacebook, IoLogoGoogle } from "react-icons/io5";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if (username && email && password) {
      const requestData = {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      };
      try {
        const response = await fetch("/api/users/register", requestData);
        const resJson = await response.json();
        if (!response.ok) throw new Error(resJson.error);
        toast.success("User registered successfully!");
        router.push("/login");
      } catch (error) {
        toast.error("Failed register!");
        console.log("Error ===> ", error.message);
      }
    } else {
      console.log("Please fill all required fields");
      toast.error("Please fill all required fields");
    }
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
        <div>
          <div className="relative w-auto h-16 flex justify-center mb-12">
            <Image
              className="shrink-0 bg-fuchsia-100 px-3 rounded-2xl p-2.5"
              src=""
              alt="Picture of the author"
              fill={true}
              loading="lazy"
            />
          </div>

          <form method="POST" className="space-y-3" onSubmit={formSubmit}>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="username"
              className="bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
              onChange={handleChange}
            />
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="fullName"
              className="bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
              onChange={handleChange}
            />
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              className="bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
              onChange={handleChange}
            />
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150 uk-scrollspy-inview "
            >
              <span>Get Started</span>
            </button>

            <div className="flex gap-3 justify-center text-2xl py-5 text-slate-500 uk-scrollspy-inview ">
              <Link href="#">
                <IoLogoFacebook />
              </Link>
              <Link href="#">
                <IoLogoGoogle />
              </Link>
              <Link href="#">
                <IoLogoApple />
              </Link>
            </div>

            <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70 uk-scrollspy-inview ">
              <span> I have account? </span>
              <span>—</span>
              <Link href="/login" className="text-gray-600 hover:text-gray-500">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
