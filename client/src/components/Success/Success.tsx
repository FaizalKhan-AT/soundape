import { FC } from "react";
interface Props {
  success: string;
  setSuccess: React.Dispatch<React.SetStateAction<string>>;
}
const Success: FC<Props> = ({ success, setSuccess }) => {
  return (
    <div
      style={{ zIndex: "20", width: "fit-content" }}
      className="alert alert-success mt-2 position-fixed end-0 bottom-0 me-3 mb-4"
      role="alert"
    >
      <button
        onClick={() => setSuccess("")}
        type="button"
        className="btn-close position-absolute end-0 top-0 mt-1 me-2"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <span className="py-2">{success}</span>
    </div>
  );
};

export default Success;
