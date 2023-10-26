import { FC, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces/User";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import { getImageBaseURL } from "../../utils/general";
import Modal from "../Modals/Modal";
import { handleOpenModal } from "../../utils/modalControls";
import followUser from "../../utils/followUser";
const Profile: FC<{ profile: User | null; postId?: string }> = ({
  profile,
  postId,
}) => {
  const FILE_BASE_URI: string = getImageBaseURL();
  const navigate = useNavigate();
  const { authState } = useContext(UserAuth) as UserType;
  const modalRef = useRef<HTMLDialogElement>(null);
  const handleFollow = async (id: string, profileId: string) => {
    const res = await followUser(id, profileId);
    const { error, status } = res;
    if (status === "error") console.error(error);
  };
  return (
    <>
      {postId ? <Modal title="Delete" id={postId} modalRef={modalRef} /> : ""}
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
          </div>
        </div>
        {authState.user?._id === profile?._id ? (
          window.location.href.includes("@") ? (
            <button
              onClick={() => handleOpenModal(modalRef)}
              className="me-4 delete-btn btn text-danger d-flex align-items-center gap-2 fw-bold"
            >
              <span
                title="Delete"
                className="material-symbols-outlined pointer"
              >
                Delete
              </span>
              <span>Delete</span>
            </button>
          ) : (
            ""
          )
        ) : (
          <span
            style={{ fontSize: "14px" }}
            onClick={() =>
              authState.isLoggedIn
                ? handleFollow(
                    profile?._id as string,
                    authState.user?._id as string
                  )
                : navigate("/signin")
            }
            className="fw-bold text-decoration-none me-5 text-primary"
          >
            Follow
          </span>
        )}
      </div>
    </>
  );
};

export default Profile;
