import { FC, useContext, useEffect, useState } from "react";
import axios from "../../../config";
import { UserAuth, UserType } from "../../../contexts/AuthContext";
import { Comment } from "../../../interfaces/Comment";
import CommentCard from "../../Cards/CommentCard";
import Spinner from "../../Spinners/Spinner";

interface Props {
  postId: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}

const Comments: FC<Props> = ({ postId, setError, setSuccess }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useContext<UserType>(UserAuth);
  const fetchComments = async () => {
    try {
      const res = await axios.get(`/posts/comment`, {
        headers: {
          "post-id": postId,
        },
      });
      const { status, error: err, data } = res.data;
      switch (status) {
        case "ok":
          setComments(data);
          break;
      }
    } catch (err: any) {
      console.error(err.response.data.error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setComment(target.value);
  };
  const handleComment = (data: Comment) => {
    setLoading(true);
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
            fetchComments();
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  return (
    <div>
      <div
        style={{ overflowY: "auto", maxHeight: 386 }}
        className="comment-card-container"
      >
        {comments && comments.length > 0 ? (
          comments.map((comment) => {
            return <CommentCard data={comment} key={comment._id} />;
          })
        ) : (
          <h4 className="text-center my-2">
            <br />
            No Comments were added till now..
          </h4>
        )}
      </div>
      <br />
      <br />
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
                postId,
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
  );
};

export default Comments;
