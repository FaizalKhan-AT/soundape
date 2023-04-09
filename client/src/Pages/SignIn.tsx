import { FC, useState } from "react";
import Error from "../components/Error/Error";
import { useNavigate } from "react-router-dom";
import Login, { FormData } from "../components/Auth/Login";
import BrandNav from "../components/Navbar/BrandNav";

const SignIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleLogin = (data: FormData) => {};
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <BrandNav />
      <div
        style={{ height: "100vh" }}
        className="w-100 d-flex align-items-center justify-content-center"
      >
        <Login loading={loading} name="Sign In" handleLogin={handleLogin} />
      </div>
    </>
  );
};

export default SignIn;
