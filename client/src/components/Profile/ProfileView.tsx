import { FC, useRef, useState, useEffect } from "react";
import { User } from "../../interfaces/User";
import { formatNumber } from "../../utils/formatNumber";
import { getImageBaseURL } from "../../utils/general";
import { handleCloseModal, handleOpenModal } from "../../utils/modalControls";
import NotFound from "../Error/NotFound";
import Modal from "../Modals/Modal";
import PostModal from "../Modals/PostModal";
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
  const IMAGE_BASE_URI: string = getImageBaseURL();
  const modalRef = useRef<HTMLDialogElement>(null);
  const postModalRef = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState<string>("");

  const openModal = (e: any) => {
    setTitle(e.target.dataset.name as string);
    handleOpenModal(modalRef);
  };
  useEffect(() => {
    handleCloseModal(postModalRef);
  }, [window.location.href]);
  if (!profile) return <NotFound err="Profile" />;

  return (
    <>
      <Modal id={profile._id} modalRef={modalRef} title={title} />
      {profile.mode ? (
        <PostModal modalRef={postModalRef} id={profile._id} />
      ) : (
        ""
      )}
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
        <div className="d-flex align-items-center flex-column pointer">
          <span
            data-name="Following"
            onClick={openModal}
            className="fw-bold fs-1"
          >
            {formatNumber(profile?.followingCount as number)}
          </span>
          <span>Following</span>
        </div>
        |
        <div className="d-flex align-items-center flex-column pointer">
          <span
            data-name="Followers"
            onClick={openModal}
            className="fw-bold fs-1"
          >
            {formatNumber(profile?.followerCount as number)}
          </span>
          <span>Followers</span>
        </div>
        {profile.mode ? (
          <>
            |
            <div
              onClick={() => handleOpenModal(postModalRef)}
              className="d-flex align-items-center flex-column pointer"
            >
              <span className="fw-bold fs-1">
                {formatNumber(profile?.postCount as number)}
              </span>
              <span>Posts</span>
            </div>
          </>
        ) : (
          ""
        )}
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
            {profile.isFollowed ? "Unfollow" : "Follow"}
          </>
        )}
      </button>
    </>
  );
};

export default ProfileView;
