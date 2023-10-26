import { FC, useState, useContext } from "react";
import { UserAuth, UserType } from "../../../contexts/AuthContext";
import {
  deletePost,
  deleteUser,
  refuteUser,
  reportPost,
  reportPostAdmin,
  revokeReportedPost,
  verifyUser,
} from "../../../utils/general";
import { handleCloseModal } from "../../../utils/modalControls";
import Error from "../../Error/Error";
import Spinner from "../../Spinners/Spinner";

interface Props {
  id: string;
  op: string;
  modalRef: React.RefObject<HTMLDialogElement>;
}

const YesOrNo: FC<Props> = ({ op, id, modalRef }) => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useContext<UserType>(UserAuth);
  const handleSuccessAndError = ({
    data,
    error,
  }: {
    data: string;
    error: string;
  }) => {
    if (data) {
      handleCloseModal(modalRef);
    } else if (error) setError(error);
    setLoading(false);
  };

  async function handleClick() {
    setLoading(true);
    switch (op) {
      case "report":
        handleSuccessAndError(await reportPost(id));
        break;
      case "report post":
        handleSuccessAndError(await reportPostAdmin(id));
        break;
      case "revoke post":
        handleSuccessAndError(await revokeReportedPost(id));
        break;
      case "delete":
        handleSuccessAndError(
          await deletePost(id, authState.user?._id as string)
        );
        break;
      case "delete user":
        handleSuccessAndError(await deleteUser(id));
        break;
      case "refute":
        handleSuccessAndError(await refuteUser(id));
        break;
      case "verify":
        handleSuccessAndError(await verifyUser(id));
        break;
    }
  }
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <br />
      <h3 className="text-center my-2">
        Are you sure to {op.split(" ")[0]} this {op === "verify" && "user"}
        {op === "refute" && "user"} ?
      </h3>
      <div className="d-flex mt-5 align-items-center justify-content-center gap-3">
        <button className="btn  btn-primary px-4" onClick={handleClick}>
          {loading ? <Spinner /> : "Yes"}
        </button>
        <button
          onClick={() => handleCloseModal(modalRef)}
          className="btn  btn-secondary px-4"
        >
          Cancel
        </button>
      </div>
    </>
  );
};

export default YesOrNo;
