"use client";

import { useState } from "react";
import BtnLoading from "../Loaders/Login/BtnLoading";
import { onValidEmail } from "@/helpers/all";

import UsernameInput from "../common/UsernameInput";

export default function LoginForm({ formType, onSubmit, loading }) {
  const inputFieldClass =
    "bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none focus-visible:outline-black";

  const btnText = loading ? (
    <BtnLoading
      className="flex justify-center"
      svgClass={"w-6 h-6 fill-white"}
    />
  ) : formType ? (
    "Login"
  ) : (
    "Create Account"
  );

  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const checkUsernameError = (e) => {
    setError((presVal) => ({ ...presVal, username: e }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear the error for the current input field
    setError((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Update the form data with the new value
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    switch (name) {
      case "email":
        if (value && !onValidEmail(value)) {
          setError((prevErrors) => ({
            ...prevErrors,
            email: "Please enter a valid email address.",
          }));
        }
        break;

      // case "password":
      //   if (value && !onValidPassword(value)) {
      //     setError((prevErrors) => ({
      //       ...prevErrors,
      //       password:
      //         "Your password must contain at least 8 characters, one letter, and one digit.",
      //     }));
      //   }
      //   break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    const errorsFound = Object.values(error).some((x) => x !== "");
    if (errorsFound) return
    onSubmit(formData);
  };

  return (
    <form method="POST" className="space-y-3" onSubmit={handleSubmit}>
      {!formType && (
        <>

          <UsernameInput
            className={inputFieldClass}
            onChange={handleChange}
            onError={checkUsernameError}
          />
          <input
            name="fullName"
            type="text"
            placeholder="Full Name"
            className={inputFieldClass}
            onChange={handleChange}
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className={`${inputFieldClass} ${
          error.email
            ? "focus-visible:outline-black border-2 border-red-400 focus:outline-red-400"
            : ""
        }`}
        value={formData.email}
        onChange={handleChange}
      />
      {error.email && (
        <span className="text-[red] text-sm pl-1">{error.email}</span>
      )}
      <input
        name="password"
        type="password"
        placeholder="Password"
        className={`${inputFieldClass} ${
          error.password ? "border-2 border-red-400 focus:outline-red-400" : ""
        }`}
        value={formData.password}
        onChange={handleChange}
      />
      {error.password && (
        <span className="text-[red] text-sm pl-1">{error.password}</span>
      )}
      <button
        type="submit"
        className={`font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150 uk-scrollspy-inview ${
          loading && "cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {btnText}
      </button>
    </form>
  );
}
