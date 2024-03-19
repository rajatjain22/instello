import dbConnect from "@/dbconfig/dbconfig";
import Users from "@/schemas/UserModel.js";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

dbConnect();

export async function GET(request, { params }) {
  const loggedUserId = request.headers.get("x-user-id");
  const nextPage = parseInt(request?.nextUrl?.searchParams.get("page")) || 0;
  try {
    const { id, type } = params;
    const pageSize = 10;
    const skipCount = nextPage * pageSize;

    if (id !== loggedUserId) {
      const checkFollow = await Users.findOne({
        _id: loggedUserId,
        following: { $in: new mongoose.Types.ObjectId(id) },
      });

      if (!checkFollow) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
    }

    const user = await Users.findById(id)
      .select(type)
      .populate([
        {
          path: type,
          select: "_id username fullName avatar",
          options: {
            sort: { createdAt: -1 },
            limit: pageSize,
            skip: skipCount,
          },
        },
      ])
      .lean()
      .exec();

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
      hasMore: user[type].length === pageSize,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
