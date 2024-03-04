import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "../../../../schemas/UserModel";
import createJWT from "../../../../jwt/createJWT";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";
import mongoose from "mongoose";

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
    const userQuery2 = await Users.aggregate([
      { $match: { email: email } },
      {
        $project: {
          username: 1,
          fullName: 1,
          email: 1,
          password: 1,
          avatar: 1,
          bio: 1,
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
          postsCount: { $size: "$posts" },
        },
      },
    ]);

    const userQuery1 = await Posts.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userQuery2[0]._id),
        },
      },
      {
        $project: {
          _id: 1,
          text: 1,
          createdAt: 1,
          post: 1,
          hasLiked: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(userQuery2[0]._id), "$likes"],
              },
              then: true,
              else: false,
            },
          },
          likesCount: { $size: "$likes" },
          commentCount: { $size: "$comments" },
          mediaCount: { $size: "$post" },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $limit: 10,
      },
    ]).exec();

    const user = { ...userQuery2[0], posts: userQuery1 };

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

    delete user.password;

    const response = NextResponse.json({
      message: "Logged in successfully!",
      user,
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
