import { FC, useEffect, useState } from "react";
import axios from "../../../config";
import { Like } from "../../../interfaces/LIke";
import LikeCard from "../../Cards/LikeCard";
interface Props {
  postId: string;
}
const Likes: FC<Props> = ({ postId }) => {
  const [likes, setLikes] = useState<Like[]>([]);
  const fetchLikes = () => {
    axios
      .get(`/posts/like/${postId}`)
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "ok":
            setLikes(data);
            break;
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };
  useEffect(() => {
    fetchLikes();
  }, []);
  return (
    <div>
      <div
        style={{ overflowY: "auto", maxHeight: 386 }}
        className="comment-card-container"
      >
        {likes && likes.length > 0 ? (
          likes.map((like) => {
            return <LikeCard data={like} key={like._id} />;
          })
        ) : (
          <h4 className="text-center my-2">
            <br />
            No Likes till now..
          </h4>
        )}
      </div>
    </div>
  );
};

export default Likes;
