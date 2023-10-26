import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import { Like } from "../../interfaces/LIke";
import { getImageBaseURL } from "../../utils/general";
interface Props {
  data: Like;
}
const LikeCard: FC<Props> = ({ data }) => {
  const { profile } = data;
  const imageBase: string = getImageBaseURL();
  const navigate = useNavigate();
  const { authState } = useContext<UserType>(UserAuth);
  return (
    <div className="d-flex align-items-center justify-content-between">
      <div
        onClick={() => navigate(`/@${profile?.username}`)}
        className="d-flex align-items-center gap-3 my-2 p-3 comment-card"
      >
        <img
          src={imageBase + profile?.profileImg}
          alt={profile?.displayname}
          width={60}
          height={60}
          style={{ objectFit: "cover" }}
          className="rounded-circle pointer"
        />
        <div className="d-flex flex-column pointer justify-content-between">
          <span>{profile?.username}</span>
          <span className="fs-5 text-muted">{profile?.displayname}</span>
        </div>
      </div>
      {/* {authState.user?._id === profile?._id ? (
        ""
      ) : (
        <button className="btn btn-sm btn-primary d-flex align-items-center justify-content-end gap-2">
          Follow
        </button>
      )} */}
    </div>
  );
};

export default LikeCard;
