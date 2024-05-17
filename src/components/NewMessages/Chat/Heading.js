import { Back } from "@/components/Icons/SvgIcons";
import { formatTimestampOnDays } from "@/helpers/all";
import Image from "next/image";
import Link from "next/link";

export default function Heading({ userId, userData }) {
  return (
    <div className="flex items-center justify-between gap-2 w- px-6 py-3.5 z-10 border-b dark:border-slate-700 sticky top-0 bg-white">
      <div className="flex items-center sm:gap-4 gap-2">
        {/* <!-- toggle for mobile --> */}
        <Link href="/messages" className="md:hidden">
          <Back className={"text-2xl -ml-4 md"} />
        </Link>

        <div className="relative w-8 h-8 cursor-pointer max-md:hidden">
          <Image
            src={userData?.[userId]?.avatar}
            alt="profile"
            className="rounded-full shadow"
            fill={true}
          />
          <div
            className={`w-2 h-2 ${
              userData?.[userId]?.status && "bg-teal-500"
            } rounded-full absolute right-0 bottom-0 m-px`}
          ></div>
        </div>
        <div className="cursor-pointer">
          <div className="text-base font-bold">
            {userData?.[userId]?.fullName}
          </div>
          <div
            className={`text-xs ${
              userData?.[userId]?.status ? "text-green-500" : "text-gray-500"
            } font-semibold`}
          >
            {userData?.[userId]?.status
              ? "Online"
              : formatTimestampOnDays(userData?.[userId]?.lastLoginAt)}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button type="button" className="button__ico">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-2xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
          </svg>
        </button>
        <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            className="text-2xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M374.79 308.78 457.5 367a16 16 0 0 0 22.5-14.62V159.62A16 16 0 0 0 457.5 145l-82.71 58.22A16 16 0 0 0 368 216.3v79.4a16 16 0 0 0 6.79 13.08z"
            ></path>
            <path
              fill="none"
              strokeMiterlimit="10"
              strokeWidth="32"
              d="M268 384H84a52.15 52.15 0 0 1-52-52V180a52.15 52.15 0 0 1 52-52h184.48A51.68 51.68 0 0 1 320 179.52V332a52.15 52.15 0 0 1-52 52z"
            ></path>
          </svg>
        </button>
        <button type="button" className="hover:bg-slate-100 p-1.5 rounded-full">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            className="text-2xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
