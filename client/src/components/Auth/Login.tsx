import { useState } from "react";
import { Link } from "react-router-dom";
import LoadingButton from "../Buttons/LoadingButton";
interface Props {
  name: string;
  admin?: boolean;
  loading: boolean;
  handleLogin: (data: FormData) => void;
}
export interface FormData {
  password: string;
  email: string;
}
const Login: React.FC<Props> = ({ name, admin, handleLogin, loading }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    password: "",
    email: "",
  });
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };
  const sendData = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(formData);
  };

  return (
    <>
      <div
        style={{
          minWidth: "310px",
          maxWidth: "320px",
          boxShadow: "var(--shadow)",
        }}
        className="card secondary-text bg-black py-4 px-2"
      >
        <div className="text-center text-light h2">{name}</div>
        <br />
        <form className="w-100" onSubmit={sendData}>
          <div className="d-flex w-100 align-items-center flex-column gap-4">
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined ">
                  alternate_email
                </span>
                <span className="fs-5">Email</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.email}
                required
                type="email"
                name="email"
                className="form-control py-2"
              />
            </div>
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined ">key</span>
                <span className="fs-5">Password</span>
              </label>
              <div className="position-relative">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control py-2 pe-5"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`position-absolute end-0 pointer top-0 mt-2 me-2 material-symbols-outlined`}
                >
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            {error ? (
              <div
                className="alert alert-danger mt-2 position-relative"
                role="alert"
              >
                {error}
                <button
                  onClick={() => setError("")}
                  type="button"
                  className="btn-close position-absolute end-0 top-0 mt-1 me-2"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ) : (
              ""
            )}
            <div className="w-100 px-3 my-2">
              <LoadingButton
                style="w-100 btn btn-primary"
                text="Login"
                loading={loading}
              />
            </div>
            <span>
              Don't have an account <Link to="/signup">Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
