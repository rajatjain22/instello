import ProfileSetting from "@/components/Profile/Edit/Edit";

export default function page({ params }) {
  const userId = params.id;
  return (
    <div className='max-w-2xl mx-auto'>
      <ProfileSetting userId={userId} />
    </div>
  );
}
