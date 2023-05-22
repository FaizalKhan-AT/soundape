import { FC, useState } from "react";
import Signup from "../components/Auth/Signup";
import Error from "../components/Error/Error";
import BrandNav from "../components/Navbar/BrandNav";
import { useNavigate } from "react-router-dom";
import { FormData } from "../components/Auth/Signup";
import axios from "../config";

const Register: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSignin = (data: FormData) => {
    setLoading(true);
    axios
      .post("auth/register", {
        Headers: {
          "Content-type": "application/json",
        },
        ...data,
      })
      .then((res) => {
        const { status, error: err } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            navigate("/signin");
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <BrandNav />
      <br />
      <div className="w-100 d-flex align-items-center justify-content-center">
        <Signup loading={loading} name="Sign Up" handleSignin={handleSignin} />
      </div>
    </>
  );
};

export default Register;
