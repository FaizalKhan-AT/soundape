import React, { FC } from "react";
import { User } from "../../interfaces/User";
import { formatNumber } from "../../utils/formatNumber";
import NotFound from "../Error/NotFound";
interface Props {
  profile: User;
  isLoggedIn: boolean;
  handleEdit: () => void;
  handleFollow: () => void;
}
const ProfileView: FC<Props> = ({
  profile,
  isLoggedIn,
  handleEdit,
  handleFollow,
}) => {
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;

  if (!profile) return <NotFound err="Profile" />;
  return (
    <>
      <img
        className="rounded-circle"
        src={IMAGE_BASE_URI + profile?.profileImg}
        alt={profile?.username}
        width={150}
        height={150}
        style={{ objectFit: "cover" }}
      />
      <div className="d-flex flex-column gap-1 text-center">
        <div className="d-flex align-items-center justify-content-center gap-2 h4">
          {profile?.username}
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
        </div>
        <h5 className="text-muted">{profile?.displayname}</h5>
        {profile.mode ? (
          <i className="secondary-text my-1 fw-bold py-0 my-0">
            {profile?.mode ? "Creator" : " "}
          </i>
        ) : (
          " "
        )}

        <pre className="text-justify mb-0 fs-6">
          {profile.profileDesc ? profile?.profileDesc : ""}
        </pre>
      </div>
      <div className="my-2 d-flex align-items-center gap-3">
        <span className="d-flex align-items-center flex-column pointer">
          <span className="fw-bold fs-1">
            {formatNumber(profile?.followingCount as number)}
          </span>
          <span>Following</span>
        </span>
        |
        <span className="d-flex align-items-center flex-column pointer">
          <span className="fw-bold fs-1">
            {formatNumber(profile?.followerCount as number)}
          </span>
          <span>Followers</span>
        </span>
        |
        <span className="d-flex align-items-center flex-column pointer">
          <span className="fw-bold fs-1">
            {formatNumber(profile?.postCount as number)}
          </span>
          <span>Posts</span>
        </span>
      </div>
      <button
        style={{ width: "250px" }}
        onClick={isLoggedIn ? handleEdit : handleFollow}
        className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
      >
        {isLoggedIn ? (
          <>
            <span className="material-symbols-rounded">settings</span>
            Settings
          </>
        ) : (
          <>
            <span className="material-symbols-rounded">person_add</span>
            Follow
          </>
        )}
      </button>
    </>
  );
};

export default ProfileView;
