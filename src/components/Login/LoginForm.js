"use client";

import { useState } from "react";
import BtnLoading from "../Loaders/Login/BtnLoading";

export default function LoginForm({ formType, onSubmit, loading }) {
  const inputFieldClass =
    "bg-transparen !w-full !p-2 !rounded-lg bg-slate-100 hover:bg-opacity-80 transition-all focus:outline:none";

  const btnText = loading ? <BtnLoading /> : formType ? "Login" : "Create Account";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    onSubmit(formData);
  };

  return (
    <form method="POST" className="space-y-3" onSubmit={handleSubmit}>
      {!formType && (
        <>
          <input
            name="username"
            type="text"
            placeholder="username"
            className={inputFieldClass}
            onChange={handleChange}
          />
          <input
            name="fullName"
            type="text"
            placeholder="fullName"
            className={inputFieldClass}
            onChange={handleChange}
          />
        </>
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className={inputFieldClass}
        value={formData.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className={inputFieldClass}
        value={formData.password}
        onChange={handleChange}
      />
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
