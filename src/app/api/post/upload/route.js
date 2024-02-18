import { NextResponse } from "next/server";
import dbConnect from "@/dbconfig/dbconfig";
import fileUpload from "express-fileupload";
import express from "express";
import cloudinary from "@/cloudnary/cloudConfig";
import Posts from "@/schemas/PostModel";
import Users from "@/schemas/UserModel";

const app = express();

app.use(fileUpload());

dbConnect();

const uploadFiles = async (files) => {
  const uploadedFiles = Object.values(files);

  try {
    const cloudinaryPromises = uploadedFiles.map(async (file) => {
      const fileStream = Buffer.from(await file.arrayBuffer());
      const base64Data = fileStream.toString("base64");
      const finalData = `data:video/mp4;base64,` + base64Data;
      const uploadMethod =
        file.size > 10 * 1024 * 1024 ? "upload_large" : "upload";

      // Configure your preferred transformation options here
      let options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "Instello/Posts",
        resource_type: "auto",
      }; // Customize according to your requirements

      return cloudinary.uploader[uploadMethod](finalData, options);
    });

    const cloudinaryResponses = await Promise.all(cloudinaryPromises);

    return cloudinaryResponses.map((response) => response.secure_url);
  } catch (error) {
    throw new Error(`Error uploading files: ${error.message}`);
  }
};

export async function POST(request) {
  try {
    const userId = request.headers.get("x-user-id");
    const form = await request.formData();
    const postText = form.get("postText");

    // Extracting the files
    const files = form.getAll("files");

    const secureUrls = await uploadFiles(files);

    const posts = new Posts({
      text: postText,
      user: userId,
      post: secureUrls,
    });

    const savedPost = await posts.save();

    await Users.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });

    return NextResponse.json({
      message: "Successfully!",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
