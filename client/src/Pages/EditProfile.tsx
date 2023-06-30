import { FC, useContext, useState } from "react";
import { EditData, EditType } from "../contexts/EditContext";
import { Navigate, useNavigate } from "react-router-dom";
import Error from "../components/Error/Error";
import Sidebar from "../components/Sidebar/Sidebar";
import EditProfileForm from "../components/Forms/EditProfileForm";
import { User } from "../interfaces/User";
import axios from "../config";
import { UserAuth, UserType } from "../contexts/AuthContext";

const EditProfile: FC = () => {
  const { EditStates } = useContext(EditData) as EditType;
  const { getUser } = useContext(UserAuth) as UserType;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleUpdate = (data: User, file: File) => {
    setLoading(true);
    axios
      .patch(
        `user/${data._id}`,
        {
          ...data,
          file,
        },
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const { status, error: err } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            getUser(localStorage.getItem("token") as string);
            navigate(`/@${data.username}`);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };
  if (!EditStates.profile) return <Navigate to="/" />;
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="d-flex gap-2 w-100 ">
        <Sidebar />
        <div
          style={{ overflowY: "auto" }}
          className="d-flex w-100 flex-column align-items-center gap-4 container my-3 mt-5"
        >
          <h2>Settings</h2>

          <EditProfileForm
            setError={setError}
            loading={loading}
            handleUpdate={handleUpdate}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
