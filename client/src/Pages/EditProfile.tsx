import { FC, useContext, useState } from "react";
import { EditData, EditType } from "../contexts/EditContext";
import { Navigate } from "react-router-dom";
import Error from "../components/Error/Error";
import Sidebar from "../components/Sidebar/Sidebar";
import EditProfileForm from "../components/Forms/EditProfileForm";

const EditProfile: FC = () => {
  const { EditStates } = useContext(EditData) as EditType;
  const [error, setError] = useState<string>("");
  if (!EditStates.profile) return <Navigate to="/" />;
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="d-flex gap-2 w-100">
        <Sidebar />
        <div className="d-flex w-100 flex-column align-items-center gap-4 container my-3 mt-5">
          <h2>Settings</h2>
          <EditProfileForm />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
