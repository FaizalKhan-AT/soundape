import { FC } from "react";
import { Link } from "react-router-dom";

const BrandNav: FC = () => {
  return (
    <nav className="w-100 align-items-center position-sticky top-0 d-flex justify-content-center">
      <Link
        to="/"
        className="text-decoration-none my-3 text-light d-flex justify-content-center align-items-center gap-3"
      >
        <span style={{ fontSize: "50px" }} className="material-symbols-rounded">
          graphic_eq
        </span>
        <span className="fw-bold fs-3 pointer">Soundape</span>
      </Link>
    </nav>
  );
};

export default BrandNav;
