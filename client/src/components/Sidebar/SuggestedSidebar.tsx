import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { dummyUsers } from "../../dummyData";
import { UserAuth, UserType } from "../../contexts/AuthContext";
const SuggestedSidebar: FC = () => {
  const { logoutUser, authState } = useContext<UserType>(UserAuth);
  const { user } = authState;
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;
  const navigate = useNavigate();
  return (
    <>
      <div className="card suggested-card px-3 py-4">
        {authState.isLoggedIn ? (
          <div className="logged-user d-flex align-items-center gap-4 pointer">
            <span
              onClick={() => navigate(`/@${user?.username}`)}
              className="d-flex align-items-center gap-4 pointer"
            >
              <img
                src={user ? IMAGE_BASE_URI + user?.profileImg : ""}
                width={60}
                className="rounded-circle"
                alt={user ? user.username : "profile picture"}
              />
              <div className="d-flex flex-column justify-content-center gap-1">
                <span className="displayname">{user ? user.username : ""}</span>
                <span className="username">{user ? user.displayname : ""}</span>
              </div>
            </span>
            <span
              style={{ fontSize: "14px" }}
              className="fw-bold text-decoration-none text-primary"
              onClick={logoutUser}
            >
              Logout
            </span>
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="divider"></div>
        <br />
        <div className="w-100 suggested-users d-flex flex-column gap-3">
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span className="secondary-text fw-bold">Suggested for you</span>
            <span className="fw-bold pointer">see all</span>
          </div>
          {dummyUsers.map((user, idx) => (
            <div
              key={user.username + idx}
              className=" my-2 w-100 suggested-user d-flex align-items-center gap-4 pointer"
            >
              <img
                src={user.pic}
                width={40}
                className="rounded-circle"
                alt="profile-pic"
              />

              <div className="w-100 d-flex flex-column justify-content-center gap-1">
                <span style={{ fontSize: "12px" }} className="displayname">
                  {user.username}
                </span>
                <span style={{ fontSize: "12px" }} className="username">
                  {user.displayname}
                </span>
              </div>
              <Link
                style={{ fontSize: "13px" }}
                className="fw-bold text-decoration-none"
                to="/logout"
              >
                Follow
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SuggestedSidebar;
