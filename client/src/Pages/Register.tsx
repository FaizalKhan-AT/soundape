import { FC, useState } from "react";
import Signup from "../components/Auth/Signup";
import Error from "../components/Error/Error";
import BrandNav from "../components/Navbar/BrandNav";
import { useNavigate } from "react-router-dom";
import { FormData } from "../components/Auth/Signup";

const Register: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSignin = (data: FormData) => {};
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <BrandNav />
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <Signup loading={loading} name="Sign Up" handleSignin={handleSignin} />
      </div>
    </>
  );
};

export default Register;
