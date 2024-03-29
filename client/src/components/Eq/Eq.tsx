import { FC } from "react";
import Profile from "../Profile/Profile";
import { User } from "../../interfaces/User";

interface Props {
  handleMute: () => void;
  handlePlay: () => void;
  mute: boolean;
  play: boolean;
  profile: User | null;
  postId?: string;
}
const Eq: FC<Props> = ({
  profile,
  mute,
  handleMute,
  play,
  handlePlay,
  postId,
}) => {
  return (
    <>
      <div className="visualizer position-relative d-flex align-items-center justify-content-center">
        <Profile postId={postId} profile={profile} />
        <div
          className={`loader ${
            play ? "stop" : ""
          } gap-3 d-flex align-items-center`}
        >
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
          <div className="bar bar4"></div>
          <div className="bar bar5"></div>
        </div>
        <div
          onClick={handlePlay}
          className="mute-btn position-absolute start-0 bottom-0 mb-3 ms-4 pointer"
        >
          <span
            id="play-btn"
            className="material-symbols-rounded active secondary-text fs-2"
          >
            {play ? "play_arrow" : "pause"}
          </span>
        </div>
        <div
          onClick={handleMute}
          className="mute-btn position-absolute end-0 bottom-0 mb-3 me-4 pointer"
        >
          <span className="material-symbols-rounded fs-2 secondary-text">
            {mute ? "volume_off" : "volume_up"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Eq;
