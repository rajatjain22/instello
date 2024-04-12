"use client";
import Messages from "@/components/Messages/Messages";

export default function page({ params: { userId } }) {
  return <Messages userId={userId} />;
}
