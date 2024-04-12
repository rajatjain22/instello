"use client";

import { UserContext } from "@/app/_context/User";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { CustomToast } from "../common/CustomToast";

export default function SocketConnect() {
  const { socket } = useContext(UserContext);
  useEffect(() => {
    socket?.on("new_friend_request", (data) => {
      toast.custom((t) => (
        <CustomToast id={t.id} visible={t.visible} data={data} />
      ));
    });
  }, [socket]);

  return <></>;
}
