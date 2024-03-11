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
  try {
    // Convert files object to an array of file objects
    const uploadedFiles = Object.values(files);

    // Map over each file to upload it to Cloudinary
    const cloudinaryPromises = uploadedFiles.map(async (file) => {
      // Convert file to base64 data
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const base64Data = fileBuffer.toString("base64");
      const finalData = `data:${file.type};base64,${base64Data}`;

      // Determine the upload method based on file size
      const uploadMethod =
        file.size > 10 * 1024 * 1024 ? "upload_large" : "upload";

      // Configure upload options
      const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        folder: "Instello/Posts",
        resource_type: "auto",
      };

      // Configure video transformation options for compression
      const videoOptions = {
        resource_type: "video",
        eager: [
          {
            format: "mp4",
            transformation: [
              { width: 640, height: 360, crop: "limit" },
              { video_codec: "h264" },
              { quality: "auto:low" },
            ],
          },
        ],
      };

      // Use appropriate options based on upload method
      const uploadOptions = uploadMethod === "upload" ? options : videoOptions;

      // Upload the file to Cloudinary
      return cloudinary.uploader[uploadMethod](finalData, uploadOptions);
    });

    // Wait for all uploads to complete
    const cloudinaryResponses = await Promise.all(cloudinaryPromises);

    // Extract the secure URLs from the responses
    const secureUrls = cloudinaryResponses.map(
      (response) => response.secure_url
    );

    return secureUrls;
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
