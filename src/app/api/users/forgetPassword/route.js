import { NextResponse } from "next/server";
import Users from "@/schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import nodemailer from "nodemailer";
import createJWT from "@/jwt/createJWT";
import crypto from "crypto";

dbConnect();

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Please provide email." },
        { status: 400 }
      );
    }

    const user = await Users.findOne({ email }).select("email");

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 404 }
      );
    }

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "jainr6000@gmail.com",
        pass: "svcooccxicdelijw",
      },
    });

    const generateOTP = () => {
      const otp = crypto.randomInt(100000, 999999); // Generates a random 6-digit number
      return otp; // Convert the number to string
    };

    console.log(generateOTP());
    const reset_token = createJWT({ email }, "1h");

    const htmlTemplate = `<div style="font-family: Arial, sans-serif; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="https://your-company-logo-url.com/logo.png" alt="Company Logo" style="max-width: 150px; height: auto;">
      </div>
      <div style="text-align: center; margin-bottom: 20px;">
        <p>Please click the following link to reset your password:</p>
        <p><a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;" href="http://localhost:3000/forget-password?l=${reset_token}">Reset Password</a></p>
      </div>
      <p>If you did not request a password reset, you can ignore this email.</p>
      <p>Thank you,<br>Instello</p>
    </div>
  </div>`;

    // Message object
    var message = {
      from: "jainr6000@gmail.com",
      to: email,
      subject: "Password Reset Request",
      // html: `<p>Please click the following link to reset your password: <a href="http://localhost:3000/forget-password?token=${reset_token}">Reset Password</a></p>`,
      html: htmlTemplate,
    };

    transport.sendMail(message, function (err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${message.to} Message Sent`);
      }
      // smtpProtocol.close();
    });
    return NextResponse.json({ message: "Send success" });
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
