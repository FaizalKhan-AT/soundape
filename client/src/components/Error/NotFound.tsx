import { FC } from "react";
import { Link } from "react-router-dom";

const NotFound: FC<{ err: string }> = ({ err }) => {
  return (
    <div
      style={{ height: "100%" }}
      className="d-flex align-items-center justify-content-center flex-column"
    >
      <h1 style={{ fontSize: "10em" }} className="fw-bold">
        404
      </h1>
      <h5 style={{ letterSpacing: "5px", fontSize: "1.5em" }}>
        {err} not found
      </h5>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;
