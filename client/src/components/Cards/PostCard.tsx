import { FC, useState, useRef } from "react";
import "./cards.css";
import Eq from "../Eq/Eq";
import { File } from "../../dummyData";
interface Props {
  data: File;
  playerRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostCard: FC<Props> = ({ data, playerRef, play, setPlay }) => {
  const [like, setLike] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(20);
  const [mute, setMute] = useState<boolean>(false);
  const handleMute = () => setMute(!mute);
  const handlePlay = () => {
    playerRef.current!.volume = 0.1;
    if (play) playerRef.current?.play();
    else playerRef.current?.pause();
    setPlay(!play);
  };

  const handleLike = () => {
    if (like === false) setLikes(likes + 1);
    setLike(!like);
  };

  return (
    <div className="card post-card px-3 py-3">
      <audio src={data.audio} ref={playerRef} loop muted={mute}>
        <source src={data.audio} type="audio/*" />
      </audio>
      <div className="player-container  d-flex align-items-center gap-4">
        <Eq
          mute={mute}
          handleMute={handleMute}
          play={play}
          handlePlay={handlePlay}
        />
      </div>
      <br />
      <div className="d-flex mx-3 align-items-center gap-4">
        <div className="d-flex align-items-center gap-3">
          <span
            onClick={handleLike}
            className={`${
              like ? "text-danger active" : ""
            } material-symbols-rounded fs-2 pointer`}
          >
            favorite
          </span>
          <span>{likes} Likes</span>
        </div>
        <span className="material-symbols-rounded fs-2 pointer">
          mode_comment
        </span>
        <span className="material-symbols-rounded fs-2 pointer">share</span>
      </div>
      <br />
      <div className="d-flex mt-5 mx-3 align-items-center justify-content-between">
        <input
          type="text"
          className="mx-3 rounded add-comment py-2 px-3 w-100"
          placeholder="Add comment"
        />
        <span className="material-symbols-rounded fs-2 pointer">send</span>
      </div>
    </div>
  );
};

export default PostCard;
