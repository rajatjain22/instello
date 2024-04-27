"use client";

import Link from "next/link";
import Following from "./Following";
import { useRouter } from "next/navigation";

export default function FollowPeoples() {
  const router = useRouter();
  return (
    <div>
      {/* Heading */}
      <div className="page__heading">
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
        <h1> Peoples</h1>
      </div>
      <Following />
    </div>
  );
}
