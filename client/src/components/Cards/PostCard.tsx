import { FC, useState, useContext, useRef } from "react";
import "./cards.css";
import Eq from "../Eq/Eq";
import { Post } from "../../interfaces/Post";
import { User } from "../../interfaces/User";
import Error from "../Error/Error";
import Success from "../Success/Success";
import { Comment } from "../../interfaces/Comment";
import Spinner from "../Spinners/Spinner";
import axios from "../../config";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import Modal from "../Modals/Modal";
import { handleOpenModal } from "../../utils/modalControls";
interface Props {
  profile: User | null;
  data: Post | null;
  playerRef: React.RefObject<HTMLAudioElement>;
  play: boolean;
  setPlay: React.Dispatch<React.SetStateAction<boolean>>;
  handleComment: (data: Comment) => void;
  loading: boolean;
}
const PostCard: FC<Props> = ({
  profile,
  data,
  playerRef,
  play,
  setPlay,
  handleComment,
  loading,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [like, setLike] = useState<boolean>(data?.liked ? data.liked : false);
  const [likes, setLikes] = useState<number>(data?.likes ? data.likes : 0);
  const [mute, setMute] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const FILE_BASE_URI = import.meta.env.VITE_FILE_BASE_URL;
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [title, setTitle] = useState<string>("Comments");
  const [tipOpen, setTipOpen] = useState<boolean>(false);
  const { authState } = useContext(UserAuth) as UserType;
  const handleMute = () => setMute(!mute);
  const handlePlay = () => {
    playerRef.current!.volume = 1;
    if (play) playerRef.current?.play();
    else playerRef.current?.pause();
    setPlay(!play);
  };
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  };

  const handleLike = (id: string) => {
    if (!authState.isLoggedIn) {
      return setError("SignIn to like");
    }
    setLike(!like);
    axios
      .post(`/posts/like/${id}`, {
        profileId: authState.user?._id,
      })
      .then((res) => {
        const { status, error: err, data: msg } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            msg.startsWith("Disliked")
              ? setLikes(likes > 0 ? likes - 1 : 0)
              : setLikes(likes + 1);

            break;
        }
      })
      .catch((err) => setError(err.response.data.error));
  };
  const copyURL = async () => {
    const { origin } = window.location;
    try {
      await navigator.clipboard.writeText(`${origin}/p/${data?._id}`);
      setSuccess("Url copied");
    } catch (err) {
      setError("Failed to copy ");
    }
  };
  const openModal = (e: any) => {
    if (tipOpen) handleTipToggle();
    setTitle(e.target.dataset.name as string);
    handleOpenModal(modalRef);
  };
  const handleTipToggle = () => {
    setTipOpen(!tipOpen);
  };
  return (
    <>
      <Modal id={data?._id as string} title={title} modalRef={modalRef} />
      {error ? <Error error={error} setError={setError} /> : ""}
      {success ? <Success success={success} setSuccess={setSuccess} /> : ""}
      <div
        style={{ userSelect: "none" }}
        className="card post-card px-3 py-3 pb-5 "
      >
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
            postId={data?._id}
          />
        </div>
        <br />
        <div className="d-flex mx-3 align-items-center justify-content-between ">
          <div className="d-flex aling-items-center gap-4">
            <div className="d-flex align-items-center gap-3">
              <span
                onClick={() => handleLike(data?._id as string)}
                className={`${
                  like ? "text-danger active" : ""
                } material-symbols-rounded fs-2 pointer`}
              >
                favorite
              </span>
              <span
                style={{ width: "fit-content" }}
                className="pointer"
                data-name="Likes"
                onClick={openModal}
              >
                {likes} Likes
              </span>
            </div>
            <span
              data-name="Comments"
              onClick={openModal}
              className="material-symbols-rounded fs-2 pointer"
            >
              mode_comment
            </span>
            <span
              onClick={copyURL}
              className="material-symbols-rounded fs-2 pointer"
            >
              share
            </span>
          </div>
          {data?.reported && profile?._id === authState.user?._id ? (
            <div className="reported-flag d-flex align-items-center text-danger gap-2">
              <span className="material-symbols-outlined fs-3">report</span>
              <span className="fw-bold">Reported</span>
            </div>
          ) : (
            ""
          )}
          {data?.reported ? (
            ""
          ) : (
            <div className="position-relative">
              <span
                onClick={handleTipToggle}
                className="material-symbols-outlined fs-2 pointer "
              >
                more_vert
              </span>
              {tipOpen ? (
                <div
                  data-name="Report"
                  onClick={openModal}
                  className="position-absolute bg-dark p-3 rounded pointer fs-6"
                >
                  Report
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
        <br />
        <div className="d-flex mx-3 ms-4 ps-3 ">
          <pre className="fs-5">{data ? data.title : ""}</pre>
        </div>
        <div className="d-flex mx-3 align-items-center justify-content-between">
          <input
            value={comment}
            onChange={handleChange}
            type="text"
            className="mx-3  add-comment py-2 px-3 w-100"
            placeholder="Add comment"
          />
          {loading ? (
            <div className="d-flex aling-items-center pointer mt-4">
              <Spinner />
            </div>
          ) : (
            <button
              onClick={() => {
                handleComment({
                  comment,
                  postId: data?._id as string,
                });
                setComment("");
              }}
              disabled={comment && comment.length > 0 ? false : true}
              className="btn px-0 "
            >
              <span className="text-light material-symbols-rounded fs-2 ">
                send
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default PostCard;
