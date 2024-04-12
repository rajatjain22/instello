import ProfileSetting from "@/components/common/Profile/Edit";

export default function page({ params }) {
  const userId = params.id;
  return (
    <div className='max-w-2xl mx-auto'>
      <ProfileSetting userId={userId} />
    </div>
  );
}
