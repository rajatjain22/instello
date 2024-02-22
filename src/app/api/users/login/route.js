import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "../../../../schemas/UserModel";
import createJWT from "../../../../jwt/createJWT";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";

dbConnect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all required fields" },
        {
          status: 400,
        }
      );
    }
    const user = await Users.findOne({ email }).populate([
      { path: "following" },
      { path: "followers" },
      {
        path: "posts",
        options: { sort: { createdAt: -1 } },
      },
    ]);
    
    if (!user) {
      return NextResponse.json(
        { error: "User not exist" },
        {
          status: 404,
        }
      );
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        {
          status: 401,
        }
      );
    }

    const tokenData = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
    };

    // Create token
    const token = createJWT(tokenData);

    const expirationTimeInHours = 10;
    const expirationTimeInSeconds = expirationTimeInHours * 60 * 60;

    const userCopy = { ...user.toObject() }; // Convert Mongoose document to plain object
    // delete userCopy.password;

    const response = NextResponse.json({
      message: "Logged in successfully!",
      user: userCopy,
    });

    // Set cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      maxAge: expirationTimeInSeconds,
    });

    await Users.findByIdAndUpdate(user._id, { lastLoginAt: Date.now() }).exec();
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
