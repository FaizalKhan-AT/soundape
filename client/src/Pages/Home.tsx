import { FC, useRef, useState, useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostCard from "../components/Cards/PostCard";
import SuggestedSidebar from "../components/Sidebar/SuggestedSidebar";
import { File, dummyAudios } from "../dummyData";

const Home: FC = () => {
  let currentIdx: number = 0;
  const [next, setNext] = useState<File[]>(dummyAudios);
  const [nowPlaying, setNowPlaying] = useState<File>(next[currentIdx]);
  const playerRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(true);
  const player = playerRef.current as HTMLAudioElement;
  const handlePrev = () => {};
  const handleNext = () => {
    player.src = next[++currentIdx].audio;
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
