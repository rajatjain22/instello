import { UserContext } from "@/app/_context/User";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useRef } from "react";
import {
  IoAddCircleOutline,
  IoHomeOutline,
  IoLogOutOutline,
  IoSearch,
} from "react-icons/io5";

export default function BottomBar({
  setbottomref,
  handleToggle,
  onClose,
  handleLogout,
}) {
  const { userDetails } = useContext(UserContext);
  const sideRef = useRef(null);

  const menu = [
    {
      icon: <IoHomeOutline className="text-2xl" />,
      label: "Home",
      path: "/",
      onClick: onClose,
    },
    {
      icon: <IoSearch className="text-2xl" />,
      label: "Search",
      path: "#",
      onClick: () => handleToggle("search"),
    },
    {
      icon: <IoAddCircleOutline className="text-2xl" />,
      label: "Create",
      path: "#",
      onClick: onClose,
    },
    {
      icon: (
        <div className="relative w-6 h-6">
          <Image
            src={userDetails.avatar}
            className="rounded-full"
            alt="profile"
            fill={true}
          />
        </div>
      ),
      label: "Profile",
      path: `/profile/${userDetails._id}`,
      onClick: onClose,
    },
    {
      icon: <IoLogOutOutline className="text-2xl" />,
      label: "Logout",
      path: `#`,
      onClick: handleLogout,
    },
  ];

  useEffect(() => {
    if (sideRef.current) {
      setbottomref(sideRef);
    }
  }, [setbottomref]);

  return (
    <div
      ref={sideRef}
      className="flex sm:hidden justify-between gap-2 h-14 fixed w-full bottom-0 bg-white z-20 p-2 border-t shadow-lg"
    >
      {menu.map((e, index) => (
        <Link
          key={index}
          href={e.path}
          className="flex items-center"
          onClick={e.onClick}
        >
          <span>{e.icon}</span>
          <span className="hidden md:block">{e.label}</span>
        </Link>
      ))}
    </div>
  );
}
