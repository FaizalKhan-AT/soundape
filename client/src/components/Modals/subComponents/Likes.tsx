import { FC, useEffect, useState } from "react";
import axios from "../../../config";
import { Like } from "../../../interfaces/LIke";
import LikeCard from "../../Cards/LikeCard";
import Spinner from "../../Spinners/Spinner";
interface Props {
  url: string;
}
const Likes: FC<Props> = ({ url }) => {
  const [profiles, setProfiles] = useState<Like[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const fetchData = () => {
    setLoading(true);
    axios
      .get(url)
      .then((res) => {
        const { status, data } = res.data;
        switch (status) {
          case "ok":
            setProfiles(data);
            setLoading(false);
            break;
        }
      })
      .catch((err) => {
        setProfiles([]);
        setMsg(err.response.data.error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, [url]);
  return (
    <div>
      <div
        style={{ overflowY: "auto", maxHeight: 386 }}
        className="comment-card-container"
      >
        {loading ? (
          <div className="text-center py-3 ">
            <Spinner size="lg" />
          </div>
        ) : profiles && profiles.length > 0 ? (
          profiles.map((like) => {
            return <LikeCard data={like} key={like._id} />;
          })
        ) : (
          <h4 className="text-center my-2">
            <br />
            {msg ? msg : "Nothing till now..."}
          </h4>
        )}
      </div>
    </div>
  );
};

export default Likes;
