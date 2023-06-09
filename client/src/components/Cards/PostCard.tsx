import { FC, useState, useRef } from "react";
import "./cards.css";
import Eq from "../Eq/Eq";
import { Post } from "../../interfaces/Post";
import { User } from "../../interfaces/User";
import Error from "../Error/Error";
import Success from "../Success/Success";
interface Props {
  profile: User | null;
  data: Post | null;
  playerRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
}
const PostCard: FC<Props> = ({ profile, data, playerRef, play, setPlay }) => {
  const [like, setLike] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(false);
  const FILE_BASE_URI = import.meta.env.VITE_FILE_BASE_URL;
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const handleMute = () => setMute(!mute);
  const handlePlay = () => {
    playerRef.current!.volume = 0.1;
    if (play) playerRef.current?.play();
    else playerRef.current?.pause();
    setPlay(!play);
  };

  const handleLike = () => {
    setLike(!like);
  };
  const copyContent = async () => {
    const { host, protocol } = window.location;
    try {
      await navigator.clipboard.writeText(
        `${protocol}//${host}/p/${data?._id}`
      );
      setSuccess("Url copied");
    } catch (err) {
      setError("Failed to copy ");
    }
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      {success ? <Success success={success} setSuccess={setSuccess} /> : ""}
      <div style={{ userSelect: "none" }} className="card post-card px-3 py-3">
        <audio
          src={data ? FILE_BASE_URI + data?.audioUrl : ""}
          ref={playerRef}
          loop
          muted={mute}
        ></audio>
        <div className="player-container  d-flex align-items-center gap-4">
          <Eq
            profile={profile}
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
            <span>{data ? data.likes : 0} Likes</span>
          </div>
          <span className="material-symbols-rounded fs-2 pointer">
            mode_comment
          </span>
          <span
            onClick={copyContent}
            className="material-symbols-rounded fs-2 pointer"
          >
            share
          </span>
        </div>
        <br />
        <div className="d-flex mx-3 ms-4 ps-3 ">
          <pre className="fs-5">{data ? data.title : ""}</pre>
        </div>
        <div className="d-flex mx-3 align-items-center justify-content-between">
          <input
            type="text"
            className="mx-3 rounded add-comment py-2 px-3 w-100"
            placeholder="Add comment"
          />
          <span className="material-symbols-rounded fs-2 pointer">send</span>
        </div>
      </div>
    </>
  );
};

export default PostCard;
