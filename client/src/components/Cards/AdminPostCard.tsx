import { FC } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../interfaces/Post";
interface Props {
  item: any;
  openModal: (e: any) => void;
}
const AdminPostCard: FC<Props> = ({ item, openModal }) => {
  return (
    <div className="card py-3 px-4 my-2 btn-bg pointer d-flex flex-row align-items-center justify-content-between">
      <Link
        className="text-light fw-bold fw-bold fs-6"
        target="_blank"
        to={`/p/${item.postId ? item.postId : item._id}`}
      >
        /p/{item.postId ? item.postId : item._id}
      </Link>
      <div className="d-flex align-items-center gap-3">
        {item.postId ? (
          <>
            <span className="text-light fw-bold">
              Reported count : {item.count}
            </span>
            <div className="pending-flag d-flex align-items-center text-warning gap-2">
              <span className="material-symbols-outlined fs-4">warning</span>
              <span className="fw-bold">Pending</span>
            </div>
          </>
        ) : (
          <div className="reported-flag d-flex align-items-center text-danger gap-2">
            <span className="material-symbols-outlined fs-4">report</span>
            <span className="fw-bold">Reported</span>
          </div>
        )}
        <button
          className="btn btn-sm btn-danger"
          data-name={item.postId ? "report post" : "revoke post"}
          data-id={item.postId ? item.postId : item._id}
          onClick={openModal}
        >
          {item.postId ? "Report" : "Revoke"}
        </button>
      </div>
    </div>
  );
};

export default AdminPostCard;
