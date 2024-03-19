import FollowPeoples from "@/components/FollowPeoples/FollowPeoples";

export default function page({ params }) {
  return (
    // <FollowModel isOpen={true} onClose={()=>false} val={params.type}/>
    <div className='max-w-2xl mx-auto'>
      <FollowPeoples />
    </div>
  );
}
