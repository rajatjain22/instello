import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";

dbConnect();
export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { username, fullName, email, password } = reqBody;

    if (!username || !fullName || !email || !password) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        {
          status: 400,
        }
      );
    }

    const isAlreadyExist = await Users.findOne({ email });
    if (isAlreadyExist) {
      return NextResponse.json(
        { error: "Email already exist" },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const newUser = new Users({
      username,
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error while registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
