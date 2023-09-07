import { FC } from "react";
interface Props {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}
const Error: FC<Props> = ({ error, setError }) => {
  return (
    <div
      style={{ zIndex: "20", width: "fit-content" }}
      className="alert alert-danger  mt-2 position-fixed end-0 bottom-0 me-3 mb-4"
      role="alert"
    >
      <button
        style={{ fontSize: "small", boxShadow: "none" }}
        onClick={() => setError("")}
        type="button"
        className="btn-close position-absolute end-0 top-0 my-1 me-2"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
      <span className="py-2">{error}</span>
    </div>
  );
};

export default Error;
