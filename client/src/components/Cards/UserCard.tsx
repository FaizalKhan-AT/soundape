import { FC } from "react";
import { User } from "../../interfaces/User";
import { Link } from "react-router-dom";
interface Props {
  item: User;
  openModal: (e: any) => void;
}
const UserCard: FC<Props> = ({ item, openModal }) => {
  return (
    <div className="card py-3 px-4 my-2 btn-bg pointer d-flex flex-row align-items-center justify-content-between">
      <Link
        className="text-light fw-bold fs-6"
        target="_blank"
        to={`/@${item.username}`}
      >
        @{item.username}
      </Link>
      <div className="d-flex align-items-center gap-3">
        <button
          className="btn btn-sm btn-primary"
          data-name={item.verified ? "refute" : "verify"}
          onClick={openModal}
        >
          {item.verified ? "Refute" : "Verify"}
        </button>
        <button
          className="btn btn-sm btn-danger"
          data-name="delete"
          onClick={openModal}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
