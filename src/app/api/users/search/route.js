import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const searchValue = reqBody?.search?.toLowerCase();

    if (!searchValue) {
      return new NextResponse(
        JSON.stringify({ error: "Please search correct value!" }),
        {
          status: 400,
        }
      );
    }

    // $or operator to perform a search with multiple criteria. Each condition within the $or array represents a separate search criterion.
    const query = {
      $or: [
        { fullName: { $regex: searchValue, $options: "i" } },
        // { email: { $regex: searchValue, $options: "i" } },
        { username: { $regex: searchValue, $options: "i" } },
      ],
    };

    const users = await Users.find(query)

    return new NextResponse(
      JSON.stringify({ message: "Successfully", users }),
      {
        status: 201,
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
