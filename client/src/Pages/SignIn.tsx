import { FC, useState, useContext } from "react";
import Error from "../components/Error/Error";
import { useNavigate } from "react-router-dom";
import Login, { FormData } from "../components/Auth/Login";
import BrandNav from "../components/Navbar/BrandNav";
import axios from "../config";
import { User } from "../interfaces/User";
import { UserAuth, UserType } from "../contexts/AuthContext";
const SignIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { getUser } = useContext<UserType>(UserAuth);
  const saveToLS = (data: User) => {
    localStorage.setItem("token", data.token as string);
    localStorage.setItem("user", JSON.stringify(data));
  };
  const handleLogin = (data: FormData) => {
    setLoading(true);
    axios
      .post("auth/login", {
        Headers: {
          "Content-type": "application/json",
        },
        ...data,
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            saveToLS(data);
            getUser(data.token);
            navigate("/");
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
      <br />
      <div className="w-100 d-flex align-items-center justify-content-center">
        <Login loading={loading} name="Sign In" handleLogin={handleLogin} />
      </div>
    </>
  );
};

export default SignIn;
