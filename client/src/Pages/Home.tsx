import { FC, useRef, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostCard from "../components/Cards/PostCard";
import SuggestedSidebar from "../components/Sidebar/SuggestedSidebar";
import { File, dummyAudios } from "../dummyData";

const Home: FC = () => {
  const [prev, setPrev] = useState<File[]>([]);
  const [next, setNext] = useState<File[]>(dummyAudios);
  const [nowPlaying, setNowPlaying] = useState<File>(next[0]);
  const playerRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(true);

  const handlePrev = () => {};
  const handleNext = () => {
    playerRef.current?.pause();
    setPlay(!play);
  };
  return (
    <>
      <div className="d-flex gap-2">
        <Sidebar />
        <button onClick={handlePrev} className="btn prev">
          <span className="material-symbols-rounded secondary-text fs-1">
            arrow_back_ios
          </span>
        </button>
        <PostCard
          playerRef={playerRef}
          data={nowPlaying}
          play={play}
          setPlay={setPlay}
        />
        <button onClick={handleNext} className="btn next">
          <span className="material-symbols-rounded secondary-text fs-1">
            arrow_forward_ios
          </span>
        </button>
        <SuggestedSidebar />
      </div>
    </>
  );
};

export default Home;
