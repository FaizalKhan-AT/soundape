import { FC, useState } from "react";
import { handleCloseModal } from "../../utils/modalControls";
import Error from "../Error/Error";
import "./modal.css";
import Comments from "./subComponents/Comments";
import Likes from "./subComponents/Likes";
interface Props {
  modalRef: any;
  title: string;
  id: string;
}
const Modal: FC<Props> = ({ modalRef, title, id }) => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const renderDesiredComponent = () => {
    switch (title.toLowerCase()) {
      case "comments":
        return (
          <Comments setError={setError} setSuccess={setSuccess} postId={id} />
        );
      case "likes":
        return <Likes postId={id} />;
      default:
        return <></>;
    }
  };
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
        <div className="p-3 my-2">{renderDesiredComponent()}</div>
      </dialog>
    </>
  );
};

export default Modal;
