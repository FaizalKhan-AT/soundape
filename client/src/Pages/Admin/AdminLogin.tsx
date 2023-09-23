import { FC, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/Auth/Login";
import Error from "../../components/Error/Error";
import BrandNav from "../../components/Navbar/BrandNav";
import axios from "../../config";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import { saveToLS } from "../../utils/general";

const AdminLogin: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { getAdmin } = useContext<UserType>(UserAuth);
  const handleLogin = (data: { email: string; password: string }) => {
    setLoading(true);
    axios
      .post("auth/admin/login", {
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
            saveToLS(data, "a");
            getAdmin(data.token);
            navigate("/admin");
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
        <Login
          admin
          loading={loading}
          name="Admin Login"
          handleLogin={handleLogin}
        />
      </div>
    </>
  );
};
export default AdminLogin;
