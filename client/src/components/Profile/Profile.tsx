import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { UserAuth, UserType } from "../../contexts/AuthContext";
const Profile: FC<{ profile: User | null }> = ({ profile }) => {
  const FILE_BASE_URI = import.meta.env.VITE_FILE_BASE_URL;
  const navigate = useNavigate();
  const { authState } = useContext(UserAuth) as UserType;
  return (
    <div className="position-absolute top-0 start-0 ms-3 w-100 mt-3 justify-content-between px-3  d-flex align-items-center gap-4 pointer">
      <div
        onClick={() => navigate(`/@${profile?.username}`)}
        className="d-flex align-items-center gap-4"
      >
        <img
          src={profile ? FILE_BASE_URI + profile.profileImg : ""}
          width={50}
          height={50}
          style={{ objectFit: "cover" }}
          className="rounded-circle"
          alt="profile-pic"
        />
        <div className="d-flex flex-column justify-content-center gap-1">
          <span
            style={{ fontSize: "18px" }}
            className="displayname d-flex align-items-center gap-2"
          >
            {profile ? profile.username : "loading.."}
            {profile?.verified ? (
              <span
                title="verified account"
                className="pointer material-symbols-outlined text-primary"
              >
                verified
              </span>
            ) : (
              ""
            )}
          </span>
          {/* <span style={{ fontSize: "13px" }} className="place secondary-text">
            Kollam, kerala
          </span> */}
        </div>
      </div>
      {authState.user?._id === profile?._id ? (
        " "
      ) : (
        <span
          style={{ fontSize: "14px" }}
          className="fw-bold text-decoration-none me-5 text-primary"
        >
          Follow
        </span>
      )}
    </div>
  );
};

export default Profile;
