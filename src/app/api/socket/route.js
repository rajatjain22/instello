import { NextResponse } from "next/server";

import { Server } from "socket.io";

const io = new Server(3005, {
  cors: {
    origin: "http://localhost:3000",
  },
});

export const GET = async (request) => {
  try {
    io.on("connection", (socket) => {
      console.log("user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });

      socket.on("message", (data) => {
        console.log(data);
      });
    });
    return NextResponse.json({
      message: "Socket connection successfull",
      success: true,
    });
  } catch (error) {
    console.log("something went wrong in Socket connection", error);
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};
