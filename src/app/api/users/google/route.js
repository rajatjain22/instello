import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import {
  generateRandomPassword,
  generateRandomUsername,
} from "@/helpers/Backend";
// import { cookies } from "next/headers";
import createJWT from "@/jwt/createJWT";

dbConnect();

export async function GET(request) {
  const accessToken = request.headers.get("x-api-token");
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_GOOGLE_API, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseJson = await response.json();

    const { name, email, picture } = responseJson;

    const user = await Users.findOne({ email }).select("+password");

    let tokenData = {};
    if (user) {
      tokenData = {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      };

      const now = new Date();
      await Users.updateOne({ _id: user._id }, { $set: { lastLoginAt: now } });
    } else {
      let username = generateRandomUsername(name);

      while (await Users.findOne({ username })) {
        username = generateRandomUsername(name);
      }

      const password = generateRandomPassword(8);

      const hashedPassword = await bcryptjs.hash(password, 10);
      const newUser = new Users({
        username,
        fullName: name,
        avatar: picture,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      if (!savedUser) {
        throw new Error("Error saving user");
      }

      tokenData = {
        id: savedUser._id,
        username: savedUser.username,
        fullName: savedUser.fullName,
        email: savedUser.email,
      };
    }
    const token = createJWT(tokenData);

    const expirationTimeInHours = 1;
    const expirationTimeInSeconds = expirationTimeInHours * 60 * 60;

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
    console.error("Error while registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      }
    );
  }
}
