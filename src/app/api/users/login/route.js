import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Users from "../../../../schemas/UserModel";
import createJWT from "../../../../jwt/createJWT";
import dbConnect from "@/dbconfig/dbconfig";

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

    // [
    //   { $match: { email: "rajat@yopmail.com" } },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "following",
    //       foreignField: "_id",
    //       as: "following",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "users",
    //       localField: "followers",
    //       foreignField: "_id",
    //       as: "followers",
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "posts",
    //       localField: "posts",
    //       foreignField: "_id",
    //       as: "posts",
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$posts",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$following",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   {
    //     $unwind: {
    //       path: "$followers",
    //       preserveNullAndEmptyArrays: true,
    //     },
    //   },
    //   { $sort: { "following.createdAt": -1 } },
    //   { $sort: { "followers.createdAt": -1 } },
    //   { $sort: { "posts.createdAt": -1 } },
    //   {
    //     $group: {
    //       _id: "$_id",
    //       email: { $first: "$email" },
    //       password: { $first: "$password" },
    //       username: { $first: "$username" },
    //       fullName: { $first: "$fullName" },
    //       avatar: { $first: "$avatar" },
    //       bio: { $first: "$bio" },
    //       following: { $first: "$following" },
    //       followers: { $first: "$followers" },
    //       posts: { $push: "$posts" },
    //       postsCount: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 1,
    //       email: 1,
    //       password: 1,
    //       username: 1,
    //       fullName: 1,
    //       avatar: 1,
    //       bio: 1,
    //       following: {
    //         $slice: [
    //           {
    //             $map: {
    //               input: "$following",
    //               as: "followingUser",
    //               in: {
    //                 _id: "$$followingUser._id",
    //                 username:
    //                   "$$followingUser.username",
    //                 fullName:
    //                   "$$followingUser.fullName",
    //                 avatar: "$$followingUser.avatar",
    //                 followingCount: {
    //                   $size:
    //                     "$$followingUser.following",
    //                 },
    //                 followersCount: {
    //                   $size:
    //                     "$$followingUser.followers",
    //                 },
    //               },
    //             },
    //           },
    //           10,
    //         ],
    //       },
    //       followers: {
    //         $slice: [
    //           {
    //             $map: {
    //               input: "$followers",
    //               as: "followersUser",
    //               in: {
    //                 _id: "$$followersUser._id",
    //                 username:
    //                   "$$followersUser.username",
    //                 fullName:
    //                   "$$followersUser.fullName",
    //                 avatar: "$$followersUser.avatar",
    //                 followingCount: {
    //                   $size:
    //                     "$$followersUser.following",
    //                 },
    //                 followersCount: {
    //                   $size:
    //                     "$$followersUser.followers",
    //                 },
    //               },
    //             },
    //           },
    //           10,
    //         ],
    //       },
    //       posts: {
    //         $slice: [
    //           {
    //             $map: {
    //               input: "$posts",
    //               as: "postsData",
    //               in: {
    //                 _id: "$$postsData._id",
    //                 likes: "$$postsData.likes",
    //                 comments: "$$postsData.comments",
    //                 text: "$$postsData.text",
    //                 post: "$$postsData.post",
    //                 createdAt:
    //                   "$$postsData.createdAt",
    //               },
    //             },
    //           },
    //           10,
    //         ],
    //       },
    //       followingCount: { $size: "$following" },
    //       followersCount: { $size: "$followers" },
    //       postsCount: 1,
    //     },
    //   },
    // ]

    const user = await Users.aggregate([
      { $match: { email: email } },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $project: {
          _id: 1,
          email:1,
          password:1,
          username: 1,
          fullName: 1,
          avatar: 1,
          bio: 1,
          following: {
            $slice: [
              {
                $map: {
                  input: "$following",
                  as: "followingUser",
                  in: {
                    _id: "$$followingUser._id",
                    username: "$$followingUser.username",
                    fullName: "$$followingUser.fullName",
                    avatar: "$$followingUser.avatar",
                    followingCount: { $size: "$$followingUser.following" },
                    followersCount: { $size: "$$followingUser.followers" },
                  },
                },
              },
              10,
            ],
          },
          followers: {
            $slice: [
              {
                $map: {
                  input: "$followers",
                  as: "followersUser",
                  in: {
                    _id: "$$followersUser._id",
                    username: "$$followersUser.username",
                    fullName: "$$followersUser.fullName",
                    avatar: "$$followersUser.avatar",
                    followingCount: { $size: "$$followersUser.following" },
                    followersCount: { $size: "$$followersUser.followers" },
                  },
                },
              },
              10,
            ],
          },
          posts: {
            $slice: [
              {
                $map: {
                  input: "$posts",
                  as: "postsData",
                  in: {
                    _id: "$$postsData._id",
                    likes: "$$postsData.likes",
                    comments: "$$postsData.comments",
                    text: "$$postsData.text",
                    post: "$$postsData.post",
                    createdAt: "$$postsData.createdAt",
                  },
                },
              },
              10,
            ]
          },
          followingCount: { $size: "$following" },
          followersCount: { $size: "$followers" },
          postsCount: { $size: "$posts" },
        },
      },
    ]);

    if (!user) {
      return NextResponse.json(
        { error: "User not exist" },
        {
          status: 404,
        }
      );
    }
    console.log(user)

    const isMatch = await bcryptjs.compare(password, user[0].password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        {
          status: 401,
        }
      );
    }

    const tokenData = {
      id: user[0]._id,
      username: user[0].username,
      fullName: user[0].fullName,
      email: user[0].email,
    };

    // Create token
    const token = createJWT(tokenData);

    const expirationTimeInHours = 10;
    const expirationTimeInSeconds = expirationTimeInHours * 60 * 60;

    delete user[0].password

    const response = NextResponse.json({
      message: "Logged in successfully!",
      user: user[0],
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
