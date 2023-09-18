import { FC, useState, useEffect } from "react";
import { handleCloseModal } from "../../utils/modalControls";
import Error from "../Error/Error";
import "./modal.css";
import Comments from "./subComponents/Comments";
import Likes from "./subComponents/Likes";
import Search from "./subComponents/Search";
import YesOrNo from "./subComponents/YesOrNo";
interface Props {
  modalRef: React.RefObject<HTMLDialogElement>;
  title: string;
  id: string;
}
const Modal: FC<Props> = ({ modalRef, title, id }) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const subComponents = {
    COMMENTS: (
      <Comments setError={setError} setSuccess={setSuccess} postId={id} />
    ),
    LIKES: <Likes url={`/posts/like/${id}`} />,
    FOLLOWING: <Likes url={`/user/following/${id}`} key={id} />,
    FOLLOWERS: <Likes url={`/user/followers/${id}`} key={id} />,
    REPORT: <YesOrNo op="report" id={id} modalRef={modalRef} />,
    SEARCH: <Search />,
    DELETE: <YesOrNo op="delete" id={id} modalRef={modalRef} />,
  };
  useEffect(() => {
    modalRef.current?.close();
  }, [window.location.href]);
  type T = keyof typeof subComponents;
  const DesiredComponent = subComponents[title.toLocaleUpperCase() as T];

  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <dialog className="modal-container" ref={modalRef}>
        <div className="d-flex align-items-center justify-content-between">
          <h3 className="mb-0">{title}</h3>
          <span
            title="Close"
            className="material-symbols-outlined pointer fs-2"
            onClick={() => handleCloseModal(modalRef)}
          >
            close
          </span>
        </div>
        <div className="line"></div>
        <div className="p-3 my-2">{DesiredComponent}</div>
      </dialog>
    </>
  );
};

export default Modal;
