import { NextResponse } from "next/server";
import Users from "../../../../schemas/UserModel";
import dbConnect from "@/dbconfig/dbconfig";
import Posts from "@/schemas/PostModel";

dbConnect();

export async function PUT(request) {
  try {
    const reqBody = await request.json();
    const userID = request.headers.get("x-user-id");
    const currentUser = await Users.findById(userID).exec();
    let updateQuery = "";

    const { postId, action } = reqBody;

    if (!currentUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (action === "like") {
      updateQuery = { $addToSet: { likes: userID } };
    } else if (action === "unlike") {
      updateQuery = { $pull: { likes: userID } };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const result = await Posts.updateOne({ _id: postId }, updateQuery);

    if (result.nModified === 0) {
      return NextResponse.json(
        { error: "Post not found or no changes made" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Operation successful",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
