import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Comment } from "../../interfaces/Comment";
import { getImageBaseURL } from "../../utils/general";

type Props = {
  data: Comment;
};

const CommentCard: FC<Props> = ({ data }) => {
  const { profile } = data;
  const imageBase: string = getImageBaseURL();
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center gap-3 my-2 p-3 comment-card">
      <img
        onClick={() => navigate(`/@${profile?.username}`)}
        src={imageBase + profile?.profileImg}
        alt={profile?.displayname}
        width={50}
        height={50}
        style={{ objectFit: "cover" }}
        className="rounded-circle pointer"
      />
      <div className="d-flex flex-column pointer justify-content-between">
        <span onClick={() => navigate(`/@${profile?.username}`)}>
          {profile?.username}
        </span>
        <span className="fs-5">{data.comment}</span>
      </div>
    </div>
  );
};

export default CommentCard;
