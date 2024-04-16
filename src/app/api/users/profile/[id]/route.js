import dbConnect from "@/dbconfig/dbconfig";
import verifyJWT from "@/jwt/verifyJWT";
import Users from "@/schemas/UserModel.js";
import fileUpload from "express-fileupload";
import express from "express";
import { NextResponse } from "next/server";
import uploadImage from "@/cloudnary/uploadImage";
import Posts from "@/schemas/PostModel";
import mongoose from "mongoose";

const app = express();
app.use(fileUpload());

dbConnect();

export async function GET(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  try {
    const query = params.id;
    // const token = request.cookies.get("token")?.value || "";

    let userId;
    if (query == "user") {
      // const data = verifyJWT(token);
      // userId = data?.id;
      userId = loggedUserId;
    } else {
      userId = query;
    }

    const data = await Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          _id: 1,
          username: 1,
          fullName: 1,
          email: 1,
          bio: 1,
          avatar: 1,
          followed_by_viewer: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(loggedUserId), "$followers"],
              },
              then: true,
              else: false,
            },
          },
          follows_viewer: {
            $cond: {
              if: {
                $in: [new mongoose.Types.ObjectId(loggedUserId), "$following"],
              },
              then: true,
              else: false,
            },
          },
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
          postsCount: { $size: "$posts" },
          status: 1,
        },
      },
    ]).exec();

    return NextResponse.json({
      message: "User Found",
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const userId = params.id;
    const form = await request?.formData();
    const avatar = form.get("avatar");
    const username = form.get("username");
    const fullName = form.get("fullName");
    const email = form.get("email");
    const bio = form.get("bio");
    const isPrivate = form.get("isPrivate");

    const user = await Users.findById(userId).select(
      "-password -createdAt -__v -lastLoginAt"
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (avatar) {
      const fileStream = Buffer.from(await avatar.arrayBuffer());
      const base64Data = fileStream.toString("base64");
      const finalData = `data:video/mp4;base64,` + base64Data;

      const avatarResult = await uploadImage(finalData, {
        folder: "/Instello/Avatar",
        transformation: {
          quality: "auto", // Automatically optimize image quality
          aspect_ratio: 1, // Ensure square profile picture (optional)
          width: 300, // Resize to 200px width (can be adjusted)
          height: 300, // Resize to 200px height (can be adjusted)
          gravity: "face", // Center the image within the resized frame
          crop: "fill", // Fill the entire frame (or use 'fit' for letterboxing)
          quality: 70,
        },
      });
      user.avatar = avatarResult;
    }

    if (username) {
      const data = await Users.findOne({
        _id: { $ne: user._id },
        username: username,
      });

      if (data) {
        return NextResponse.json(
          { error: "Username already exists" },
          { status: 409 }
        );
      }
      user.username = username;
    }

    if (email) {
      const data = await Users.findOne({
        _id: { $ne: user._id },
        email: email,
      });

      if (data) {
        return NextResponse.json(
          { error: "Email already exists" },
          { status: 409 }
        );
      }
      user.email = email;
    }

    if (bio) {
      user.bio = bio ? bio : "";
    }

    if (fullName) {
      user.fullName = fullName;
    }

    user.updatedAt = Date.now();
    await user.save();

    return NextResponse.json({
      message: "Update user",
      data: { avatar: user.avatar },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
