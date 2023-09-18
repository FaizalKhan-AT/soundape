import { FC, useState, useRef, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "../../config";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import { Comment } from "../../interfaces/Comment";
import { Post } from "../../interfaces/Post";
import { User } from "../../interfaces/User";
import { handleCloseModal } from "../../utils/modalControls";
import PostCard from "../Cards/PostCard";
import NotFound from "../Error/NotFound";
import Spinner from "../Spinners/Spinner";

interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  id: string;
}

const PostModal: FC<Props> = ({ modalRef, id: profileId }) => {
  const [count, setCount] = useState<number>(0);
  const [ids, setIds] = useState<{ _id: string }[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Post | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [nowPlayingId, setNowPlayingId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const playerRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(true);
  let { id } = useParams();
  const { authState } = useContext(UserAuth) as UserType;
  const loggedInId: string = authState.user?._id as string;
  const handlePrev = () => {
    setPlay(true);
    setNowPlayingId(ids[count - 1]._id);
    setCount(count - 1);
  };
  const handleNext = () => {
    setPlay(true);
    setNowPlayingId(ids[count]._id);
    setCount(count + 1);
  };
  const fetchPostIds = () => {
    setLoading(true);
    axios
      .get("/guest", {
        headers: {
          "profile-id": profileId,
          "logged-in-id": loggedInId,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            setIds(data);
            setNowPlayingId(data[count]._id);
            setCount(count + 1);
            break;
        }
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  const getIndividualPost = (id: string) => {
    setNowPlaying(null);
    setProfile(null);
    const profileId = authState.isLoggedIn ? authState.user?._id : "";
    axios
      .get(`/guest/post/${id}`, {
        headers: {
          "profile-id": profileId,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            setNowPlaying(data.post);
            setProfile(data.profile);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  const handleAddComment = (data: Comment) => {
    setLoadingComment(true);
    if (!authState.isLoggedIn) {
      return setError("SignIn to add comment");
    }
    axios
      .post(`/posts/comment/`, {
        ...data,
        profile: authState.user?._id,
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            setSuccess(data);
            break;
        }
        setLoadingComment(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoadingComment(false);
      });
  };
  useEffect(() => {
    fetchPostIds();
  }, [profileId]);
  useEffect(() => {
    getIndividualPost(nowPlayingId);
  }, [nowPlayingId]);

  return (
    <>
      <dialog className="modal-container post" ref={modalRef}>
        <span
          title="Close"
          className="material-symbols-outlined pointer fs-2"
          onClick={() => handleCloseModal(modalRef)}
        >
          close
        </span>

        <div>
          {loading ? (
            <div className="d-flex flex-column align-items-center  ">
              <Spinner size="lg" />
              <span className="my-2">loading..</span>
            </div>
          ) : (ids && ids.length > 0) || nowPlaying ? (
            <div className="d-flex align-items-center me-5">
              <button
                style={{ border: "none !important" }}
                disabled={count === 0 ? true : false}
                onClick={handlePrev}
                className="btn prev"
              >
                <span className="material-symbols-rounded secondary-text fs-1">
                  arrow_back_ios
                </span>
              </button>
              <PostCard
                handleComment={handleAddComment}
                key={nowPlaying?._id}
                profile={profile}
                playerRef={playerRef}
                data={nowPlaying}
                play={play}
                setPlay={setPlay}
                loading={loadingComment}
              />
              <button
                style={{ border: "none !important" }}
                onClick={handleNext}
                disabled={count >= ids.length ? true : false}
                className="btn next"
              >
                <span className="material-symbols-rounded secondary-text fs-1">
                  arrow_forward_ios
                </span>
              </button>
            </div>
          ) : nowPlaying === null ? (
            <div className="d-flex flex-column align-items-center">
              <NotFound err="😢 Post" />
            </div>
          ) : (
            <div
              style={{ width: "50%" }}
              className="d-flex flex-column align-items-center"
            >
              <h1>😢</h1>
              <h3>Nothing to show here till now..</h3>
            </div>
          )}
        </div>
      </dialog>
    </>
  );
};

export default PostModal;
