"use client";

import { UserContext } from "@/app/_context/User";
import ProfilePlaceholder from "@/components/Placeholders/profile/ProfilePlaceholder";
import ProfileHeader from "@/components/common/Profile/ProfileHeader";
import ProfilePicture from "@/components/common/Profile/ProfilePicture";
import ProfilePosts from "@/components/common/Profile/ProfilePosts";
import { useContext, useEffect, useState } from "react";
import IsPrivate from "../common/Profile/IsPrivate";

export default function Profile({ userId }) {
  const { userDetails } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId && !userDetails) return;
    if (userId === userDetails?._id) {
      return setProfile(userDetails);
    }

    const fetchData = async () => {
      try {
        const userDataResponse = await fetch(`/api/users/profile/${userId}`);
        if (!userDataResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const userData = await userDataResponse.json();

        if (userData.data.followed_by_viewer) {
          const postDataResponse = await fetch(`/api/post/${userId}`);
          if (!postDataResponse.ok) {
            throw new Error("Network response for user's posts was not ok");
          }
          const postData = await postDataResponse.json();

          setProfile({ ...userData.data, posts: postData.data });
        } else {
          setProfile({ ...userData.data, posts: [] });
        }
      } catch (error) {
        console.error("Error while fetching user data:", error.message);
      }
    };

    fetchData();
  }, [userId, userDetails]);

  if (!profile) {
    return <ProfilePlaceholder />;
  }

  return (
    <>
      <div className='py-6 relative'>
        <div className='flex md:gap-16 gap-4 max-md:flex-col'>
          <ProfilePicture profile={profile} />
          <ProfileHeader profile={profile} setProfile={setProfile} />
        </div>
      </div>

      {userDetails._id === profile._id || profile.followed_by_viewer ? (
        <ProfilePosts profile={profile} />
      ) : (
        <IsPrivate />
      )}
    </>
  );
}
