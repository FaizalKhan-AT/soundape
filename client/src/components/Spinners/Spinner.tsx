import { FC } from "react";

const Spinner: FC = () => {
  return (
    <span
      className="spinner-border spinner-border-sm"
      role="status"
      aria-hidden="true"
    ></span>
  );
};

export default Spinner;
