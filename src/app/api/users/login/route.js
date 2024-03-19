import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "../../../../schemas/UserModel";
import createJWT from "../../../../jwt/createJWT";
import dbConnect from "@/dbconfig/dbconfig";
// import { cookies } from "next/headers";

dbConnect();

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please provide both email and password" },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    };

    const token = createJWT(tokenData);

    const expirationTimeInHours = 1;
    const expirationTimeInSeconds = expirationTimeInHours * 60 * 60;

    const now = new Date();
    await Users.updateOne({ _id: user._id }, { $set: { lastLoginAt: now } });

    // cookies().set("token", token, {
    //   httpOnly: true,
    //   maxAge: expirationTimeInSeconds,
    // });

    const headers = {
      "Set-Cookie": `token=${token}; HttpOnly; Max-Age=${expirationTimeInSeconds}; Path=/`,
    };

    return NextResponse.json(
      {
        message: "Logged in successfully!",
      },
      {
        headers,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
