import PageWrapper from "@/components/SideNavBar/PageWrapper";
import dynamic from "next/dynamic";

const Story = dynamic(() => import("@/components/Story/Story"));
const PostContainer = dynamic(() =>
  import("@/components/PostContainer/PostContainer")
);

export default function Home() {
  return (<PageWrapper />
    // <>
    //   <Story />
    //   <PostContainer />
    // </>
  );
}
