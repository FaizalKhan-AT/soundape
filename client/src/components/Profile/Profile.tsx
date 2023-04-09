import { FC } from "react";
import profile from "../../assets/demo/profile_img.jfif";
import { Link } from "react-router-dom";
const Profile: FC = () => {
  return (
    <div className="position-absolute top-0 start-0 ms-3 w-100 mt-3 justify-content-between px-3  d-flex align-items-center gap-4 pointer">
      <div className="d-flex align-items-center gap-4">
        <img
          src={profile}
          width={50}
          className="rounded-circle"
          alt="profile-pic"
        />
        <div className="d-flex flex-column justify-content-center gap-1">
          <span style={{ fontSize: "13px" }} className="displayname">
            al_techie
          </span>
          <span style={{ fontSize: "13px" }} className="place secondary-text">
            Kollam, kerala
          </span>
        </div>
      </div>
      <Link
        style={{ fontSize: "14px" }}
        className="fw-bold text-decoration-none me-5"
        to=""
      >
        Follow
      </Link>
    </div>
  );
};

export default Profile;
