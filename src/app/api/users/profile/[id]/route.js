import dbConnect from "@/dbconfig/dbconfig";
import verifyJWT from "@/jwt/verifyJWT";
import Users from "@/schemas/UserModel.js";
import fileUpload from "express-fileupload";
import express from "express";
import { NextResponse } from "next/server";
import uploadImage from "@/cloudnary/uploadImage";
import Posts from "@/schemas/PostModel";

const app = express();
app.use(fileUpload());

dbConnect();

export async function GET(request, { params }) {
  try {
    const query = params.id;
    const token = request.cookies.get("token")?.value || "";

    let userId;
    if (query == "user") {
      const data = verifyJWT(token);
      userId = data?.id;
    } else {
      userId = query;
    }

    const user = await Users.findOne({ _id: userId })
      .select("-password -createdAt -updatedAt -__v -lastLoginAt")
      .populate([
        { path: "followers" },
        { path: "following" },
        { path: "posts", model: Posts },
      ]);

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    const userId = params.id;
    const form = await request.formData();
    const avatar = form.get("avatar");

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
        },
      });
      user.avatar = avatarResult;
    }

    user.updatedAt = Date.now();
    await user.save();

    return NextResponse.json({
      message: "Update user",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
