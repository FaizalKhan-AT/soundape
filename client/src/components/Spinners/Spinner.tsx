import { FC } from "react";

const Spinner: FC<{ size?: string }> = ({ size }) => {
  return (
    <span
      className={`spinner-border spinner-border-${size ? size : "sm"}`}
      role="status"
      aria-hidden="true"
    ></span>
  );
};

export default Spinner;
