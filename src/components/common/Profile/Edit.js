"use client";

import { UserContext } from "@/app/_context/User";
import BtnLoading from "@/components/Loaders/Login/BtnLoading";
import UsernameInput from "@/components/common/UsernameInput";
import { onValidEmail } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Tab, Tabs } from "../Tabs";

export default function ProfileSetting({ userId }) {
  const { userDetails, setUserDetails } = useContext(UserContext);
  const router = useRouter();
  const [editData, setEditdata] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setLtnLoading] = useState(false);
  const [pswBtnLoading, setPswBtnLoading] = useState(false);
  const [error, setError] = useState({});

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const checkUsernameError = (e) => {
    setError((presVal) => ({ ...presVal, username: e }));
  };

  useEffect(() => {
    if (userId !== userDetails._id) {
      return notFound();
    }

    if (userDetails) {
      const { _id, username, fullName, email, bio, isPrivate } = userDetails;
      setEditdata({ _id, username, fullName, email, bio, isPrivate });
      setLoading(false);
    } else {
      fetch(`/api/users/profile/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((res) => {
          const { _id, username, fullName, email, bio, isPrivate } = res.data;
          setEditdata({ _id, username, fullName, email, bio, isPrivate });
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [userDetails, userId]);

  const handlePersonalInfoChangeInput = (e) => {
    const { name, value } = e.target;
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));

    setEditdata((prevEditData) => ({ ...prevEditData, [name]: value }));

    if (name === "email" && value && !onValidEmail(value)) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!editData.username || !editData.fullName || !editData.email) {
        toast.error("Please fill out all fields");
        return;
      }

      const errorsFound = Object.values(error).some((x) => x !== "");
      if (errorsFound) {
        toast.error("Please enter valid data");
        return;
      }

      setLtnLoading(true);
      const formData = new FormData();
      formData.append("username", editData.username);
      formData.append("fullName", editData.fullName);
      formData.append("email", editData.email);
      formData.append("bio", editData.bio);
      formData.append("isPrivate", editData.isPrivate);

      const response = await fetch(`/api/users/profile/${editData._id}`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        const { data } = await response.json();
        toast.success("Updated!");
        setUserDetails((presVal) => ({
          ...presVal,
          username: editData.username,
          fullName: editData.fullName,
          email: editData.email,
          bio: editData.bio,
          isPrivate: editData.isPrivate,
        }));
      } else {
        toast.error("Upload failed");
        console.error("Upload failed", response);
      }
    } catch (error) {
      toast.error("Upload failed");
      console.error("Error Editing User Profile: ", error);
    } finally {
      setLtnLoading(false);
    }
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;

    setPassword((prevEditData) => ({
      ...prevEditData,
      [name]: value,
    }));
  };

  const handleChangePasswordSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        !password.currentPassword ||
        !password.newPassword ||
        !password.confirmPassword
      ) {
        toast.error("Please fill out all fields");
        return;
      }

      if (password.newPassword !== password.confirmPassword) {
        toast.error("Password doesn't match");
        return;
      }

      setPswBtnLoading(true);
      const formData = new FormData();
      formData.append("currentPassword", password.currentPassword);
      formData.append("newPassword", password.newPassword);
      formData.append("confirmPassword", password.confirmPassword);

      const response = await fetch(`/api/users/profile/${editData._id}`, {
        method: "PUT",
        body: formData,
      });
      const resJson = await response.json();
      if (response.ok) {
        toast.success("Updated!");
        setPassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(resJson.error || "Update failed");
        console.error("Update failed", response);
      }
    } catch (error) {
      toast.error(error.error);
      console.error("Error Editing User Profile: ", error);
    } finally {
      setPswBtnLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="page__heading py-6">
        <Link href={"#"} onClick={() => router.back()}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="48"
              d="M328 112 184 256l144 144"
            ></path>
          </svg>
          Back
        </Link>
        <h1> Edit </h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm dark:border-slate-700 dark:bg-dark2">
        <div className="flex md:gap-8 gap-4 items-center md:p-10 p-6">
          <div className="relative md:w-20 md:h-20 w-12 h-12 shrink-0">
            <Image
              id="img"
              src={userDetails.avatar}
              className="object-cover rounded-full"
              alt="profile"
              fill={true}
              loading="lazy"
            />
          </div>

          <div className="flex-1">
            <h3 className="md:text-xl text-base font-semibold text-black dark:text-white">
              {userDetails.fullName}
            </h3>
            <p className="text-sm text-blue-600 mt-1 font-normal">
              @{userDetails.username}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 mb-20 text-sm font-medium text-gray-600 dark:text-white/80">
        <div
          id="setting_tab"
          className="bg-white border rounded-xl shadow-sm md:py-12 md:px-20 p-6 overflow-hidden dark:border-slate-700 dark:bg-dark2"
        >
          <Tabs>
            <Tab label="Personal Information">
              {/* <!-- tab user basic info --> */}
              <form onSubmit={handleFormSubmit}>
                <div className="space-y-6">
                  <div className="md:flex items-center gap-10">
                    <label className="md:w-32 text-right"> Username </label>
                    <div className="flex-1 max-md:mt-4">
                      <UsernameInput
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                        onChange={handlePersonalInfoChangeInput}
                        value={editData.username}
                        onError={checkUsernameError}
                      />
                    </div>
                  </div>
                  <div className="md:flex items-center gap-10">
                    <label className="md:w-32 text-right"> Full name </label>
                    <div className="flex-1 max-md:mt-4">
                      <input
                        type="text"
                        name="fullName"
                        value={editData.fullName}
                        onChange={handlePersonalInfoChangeInput}
                        placeholder="Monroe"
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="md:flex items-center gap-10">
                    <label className="md:w-32 text-right"> Email </label>
                    <div className="flex-1 max-md:mt-4">
                      <input
                        type="text"
                        name="email"
                        value={editData.email}
                        onChange={handlePersonalInfoChangeInput}
                        placeholder="Email"
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="md:flex items-start gap-10">
                    <label className="md:w-32 text-right"> Bio </label>
                    <div className="flex-1 max-md:mt-4">
                      <textarea
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                        rows="5"
                        name="bio"
                        value={editData?.bio ?? ""}
                        onChange={handlePersonalInfoChangeInput}
                        placeholder="Enter your Bio"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* <div className="md:flex items-center gap-10">
              <label className="md:w-32 text-right"> Private Account </label>
              <div className="flex-1 max-md:mt-4">
                <select
                  name="isPrivate"
                  value={editData.isPrivate}
                  className="!border-0 !rounded-md lg:w-1/2 w-full bg-slate-100 focus-visible:outline-none p-2.5 dark:text-white"
                  onChange={handlePersonalInfoChangeInput}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div> */}

                <div className="flex items-center justify-end gap-4 mt-16">
                  {btnLoading ? (
                    <button
                      type="button"
                      disabled
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                      <BtnLoading
                        className="flex justify-center cursor-not-allowed"
                        svgClass={"w-6 h-6 fill-white"}
                      />
                      <span className="ripple-overlay"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                      Save <span className="ripple-overlay"></span>
                    </button>
                  )}
                </div>
              </form>
            </Tab>
            {/* <!-- tab password--> */}
            <Tab label="Password">
              <form onSubmit={handleChangePasswordSubmit}>
                <div className="space-y-6">
                  <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                    <label className="md:w-40 text-right">
                      Current Password
                    </label>
                    <div className="flex-1 max-md:mt-4">
                      <input
                        type="password"
                        placeholder="******"
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                    <label className="md:w-40 text-right">New password</label>
                    <div className="flex-1 max-md:mt-4">
                      <input
                        type="password"
                        placeholder="******"
                        name="newPassword"
                        value={password.newPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="md:flex items-center gap-16 justify-between max-md:space-y-3">
                    <label className="md:w-40 text-right">
                      Repeat password
                    </label>
                    <div className="flex-1 max-md:mt-4">
                      <input
                        type="password"
                        placeholder="******"
                        name="confirmPassword"
                        value={password.confirmPassword}
                        onChange={handlePasswordChangeInput}
                        className="w-full border-0 bg-slate-100 focus-visible:outline-none p-2.5 rounded-lg dark:text-white"
                      />
                    </div>
                  </div>

                  {/* <hr className="border-gray-100 dark:border-gray-700" />

                    <div className="md:flex items-center gap-16 justify-between">
                      <label className="md:w-40 text-right">
                        Two-factor authentication
                      </label>
                      <div className="flex-1 max-md:mt-4">
                        <select className="w-full !border-0 !rounded-md">
                          <option value="1">Enable</option>
                          <option value="2">Disable</option>
                        </select>
                      </div>
                    </div> */}
                </div>

                <div className="flex items-center justify-end gap-4 mt-16">
                  {pswBtnLoading ? (
                    <button
                      type="button"
                      disabled
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                      <BtnLoading
                        className="flex justify-center cursor-not-allowed"
                        svgClass={"w-6 h-6 fill-white"}
                      />
                      <span className="ripple-overlay"></span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="button lg:px-10 bg-primary text-white max-md:flex-1"
                    >
                      Update <span className="ripple-overlay"></span>
                    </button>
                  )}
                </div>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
}
