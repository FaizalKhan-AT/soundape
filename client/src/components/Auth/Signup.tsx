import { FC, useState } from "react";
import { validateEmail, validatePassword, validateUsername } from "./Validate";
import { Link } from "react-router-dom";
import LoadingButton from "../Buttons/LoadingButton";

interface Props {
  name: string;
  handleSignin: (data: FormData) => void;
  loading: boolean;
}
export interface FormData {
  username: string;
  password: string;
  email: string;
  displayname: string;
}
const Signup: FC<Props> = ({ name, handleSignin, loading }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    email: "",
    displayname: "",
  });

  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };
  const validateData = () => {
    if (!validatePassword(formData.password))
      return "Password must contain atleast 8 characters, must include special character, upper and lowercase characters, numbers to make password strong";
    if (!validateEmail(formData.email))
      return "Entered email address is not valid";
    if (!validateUsername(formData.username))
      return "Invalid username format. you are allowed to use lowercase alphabets,(.,_) etc";
    return true;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateData();
    if (err !== true) {
      setError(err);
      return;
    }
    handleSignin(formData);
  };
  return (
    <>
      <div
        style={{
          minWidth: "310px",
          maxWidth: "320px",
          boxShadow: "var(--shadow)",
        }}
        className="card secondary-text bg-black py-3 px-2"
      >
        <div className="text-center text-light h2">{name}</div>
        <br />
        <form className="w-100" onSubmit={handleSubmit}>
          <div className="d-flex w-100 align-items-center flex-column gap-4">
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined">
                  account_circle
                </span>
                <span className="fs-5">Username</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.username}
                required
                type="text"
                name="username"
                className="form-control"
              />
            </div>
            <div className="w-100 px-3">
              <label className="form-label d-flex align-items-center gap-2">
                <span className="fs-3 material-symbols-outlined">
                  account_circle
                </span>
                <span className="fs-5">Full name</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.displayname}
                required
                type="text"
                name="displayname"
                className="form-control"
              />
            </div>
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
                className="form-control"
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
                  className="form-control pe-5"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className={`position-absolute pointer end-0 top-0 mt-2 me-2 material-symbols-outlined`}
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
                <button
                  onClick={() => setError("")}
                  type="button"
                  className="btn-close position-absolute end-0 top-0 mt-1 me-2"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
                <span className="py-2">{error}</span>
              </div>
            ) : (
              ""
            )}
            <div className="w-100 px-3 mb-2">
              <LoadingButton
                style="w-100 btn btn-primary"
                text="Register"
                loading={loading}
              />
            </div>
            <span>
              Already have an account <Link to="/signin">SignIn</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
