import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

dbConnect();
export async function GET(request) {
  try {
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ error: "Please search correct value!" }),
        {
          status: 400,
        }
      );
    }

    const requestData = await Users.findById(userId).select("followRequest isPrivate").populate('followRequest');

    return new NextResponse(
      JSON.stringify({
        message: "Successfully",
        data: requestData,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error while registering user:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
      }
    );
  }
}
