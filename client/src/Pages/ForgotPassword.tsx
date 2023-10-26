import { FC, useState } from "react";
import Error from "../components/Error/Error";
import BrandNav from "../components/Navbar/BrandNav";
import ForgotControl from "../components/Auth/ForgotControl";

const ForgotPassword: FC = () => {
  const [error, setError] = useState<string>("");
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <BrandNav />
      <br />
      <br />
      <div className="w-100 d-flex align-items-center justify-content-center">
        <ForgotControl />
      </div>
    </>
  );
};

export default ForgotPassword;
