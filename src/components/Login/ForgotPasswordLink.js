"use client";

import Link from "next/link";

export default function ForgotPasswordLink() {
  const handleForgetPassword = () => {
    fetch("/api/users/forgetPassword", {
      method: "POST",
      body: JSON.stringify({ email: "johnwick2@yopmail.com" }),
    })
      .then(res=>res.json())
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error.message);
      });
  };  

  return (
    <>
      <button onClick={handleForgetPassword} className='text-sm text-right text-gray-400 py-4'>
        Forget password
      </button>
    </>
  );
}
