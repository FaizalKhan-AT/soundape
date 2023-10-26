import { FC, useState } from "react";
import { FormData } from "./Login";
import LoadingButton from "../Buttons/LoadingButton";
import { validateEmail, validatePassword } from "../../utils/Validate";
import axios_instance from "../../config";
import { useNavigate } from "react-router-dom";

const ForgotControl: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData({ ...formData, [target.name]: target.value });
  };
  const checkEmail = (email: string) => {
    setLoading(true);
    axios_instance
      .get("/auth/forgot-password/check-email", {
        headers: {
          email,
        },
      })
      .then((res) => {
        const { data, status } = res.data;
        if (status === "ok") setValidEmail(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid email id provided");
      });
  };
  const changePassword = (data: FormData) => {
    setLoading(true);
    axios_instance
      .patch("/auth/forgot-password/change-password", {
        ...data,
      })
      .then((res) => {
        const { data, status } = res.data;
        if (status === "ok") {
          setLoading(false);
          navigate("/signin");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Couldn't change password");
      });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (validEmail) {
      if (!validatePassword(formData.password)) {
        setError(
          "Password must contain atleast 8 characters, must include special character, upper and lowercase characters, numbers to make password strong"
        );
        return;
      }
      changePassword(formData);
    } else {
      if (!validateEmail(formData.email)) {
        setError("Invalid Email Address");
        return;
      }
      checkEmail(formData.email);
    }
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
        <div className="text-center text-light h2 my-2">Forgot Password</div>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="d-flex w-100 align-items-center flex-column gap-4">
            {validEmail ? (
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
            ) : (
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
            )}
          </div>

          {error ? (
            <div
              className="alert alert-danger mt-4 position-relative mx-3"
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
          <br />
          <div className="w-100 px-3 my-2">
            <LoadingButton
              type="submit"
              style="w-100 btn btn-primary"
              text={validEmail ? "Change Password" : "Next"}
              loading={loading}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotControl;
