import dbConnect from "@/dbconfig/dbconfig";
import Users from "@/schemas/UserModel.js";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

dbConnect();

export async function GET(request, { params }) {
  try {
    const { id, type } = params;
    const loggedUserId = request.headers.get("x-user-id");

    const userQuery1 = Users.findById(id)
      .select(type)
      .populate([
        {
          path: type,
          select: "_id username fullName avatar",
          options: { sort: { createdAt: -1 }, limit: 10 },
        },
      ])
      .lean()
      .exec();

    const userQuery2 = Users.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $project: {
          followersCount: { $size: "$followers" },
          followingCount: { $size: "$following" },
        },
      },
    ]);

    let user = await Promise.all([userQuery1, userQuery2])
      .then(([userQuery1, userQuery2]) => {
        return { ...userQuery1, ...userQuery2[0] };
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        return {};
      });

    if (user && user[type]) {
      for (const [index, e] of user[type].entries()) {
        try {
          const userQued = await Users.findOne({
            _id: new mongoose.Types.ObjectId(loggedUserId),
            following: new mongoose.Types.ObjectId(e._id),
          });
          user[type][index].followed_by_viewer = !!userQued;
        } catch (error) {
          console.error(error);
        }
      }
    }

    return NextResponse.json({
      message: "User Found",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
