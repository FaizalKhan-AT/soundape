import { FC, useRef, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostCard from "../components/Cards/PostCard";
import SuggestedSidebar from "../components/Sidebar/SuggestedSidebar";
import { Post } from "../interfaces/Post";
import axios from "../config";
import Spinner from "../components/Spinners/Spinner";
import Error from "../components/Error/Error";
import { User } from "../interfaces/User";
import { useParams } from "react-router-dom";

const Home: FC = () => {
  const [count, setCount] = useState<number>(0);
  const [ids, setIds] = useState<{ _id: string }[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Post | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [nowPlayingId, setNowPlayingId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const playerRef = useRef<HTMLAudioElement>(null);
  const [play, setPlay] = useState<boolean>(true);
  let { id } = useParams();
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
      .get("/guest")
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
    axios
      .get(`/guest/post/${id}`)
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
  useEffect(() => {
    if (id !== undefined) {
      getIndividualPost(id as string);
    } else fetchPostIds();
  }, [window.location.href]);
  useEffect(() => {
    getIndividualPost(nowPlayingId);
  }, [nowPlayingId]);

  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <div className="d-flex gap-2">
        <Sidebar />
        {loading ? (
          <div
            style={{ width: "50%" }}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <Spinner size="lg" />
            <span className="my-2">loading..</span>
          </div>
        ) : (
          <>
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
              profile={profile}
              playerRef={playerRef}
              data={nowPlaying}
              play={play}
              setPlay={setPlay}
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
          </>
        )}
        <SuggestedSidebar />
      </div>
    </>
  );
};

export default Home;
