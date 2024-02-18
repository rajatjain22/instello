"use client";

import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import Suggestion from "./Suggestion";
import Following from "./Following";
import { useRouter } from "next/navigation";

export default function FollowPeoples() {
  const router = useRouter();
  return (
    <div>
      {/* Heading */}
      <div className="page__heading">
        <Link href={"#"} onClick={() => router.back()}>
          <IoChevronBackOutline />
          Back
        </Link>
        <h1> Peoples</h1>
      </div>
      <Following />
      {/* <Suggestion /> */}
    </div>
  );
}
