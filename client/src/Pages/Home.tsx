import { FC } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostCard from "../components/Cards/PostCard";
import SuggestedSidebar from "../components/Sidebar/SuggestedSidebar";

const Home: FC = () => {
  return (
    <>
      <div className="d-flex gap-5  ">
        <Sidebar />
        <PostCard />
        <SuggestedSidebar />
      </div>
    </>
  );
};

export default Home;
