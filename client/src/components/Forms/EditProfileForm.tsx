import { FC, useContext, useRef, useState } from "react";
import { EditData, EditType } from "../../contexts/EditContext";
import { User } from "../../interfaces/User";

const EditProfileForm: FC = () => {
  const { EditStates } = useContext(EditData) as EditType;
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;
  const [profile, setProfile] = useState<User | null>(
    EditStates.profile ? EditStates.profile : null
  );
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <form className="w-100 d-flex align-items-center justify-content-center gap-3 flex-column container">
      <div className="d-flex align-items-center">
        <img
          className="rounded-circle"
          src={IMAGE_BASE_URI + profile?.profileImg}
          alt={profile?.username}
          width={100}
        />
        <input type="file" ref={fileRef} hidden />
        <span className="btn btn-link text-primary ms-3 pointer">Change</span>
      </div>
      <br />
      <div className="row w-100 container">
        <div className="col-md-5 my-2">
          <label className="form-label secondary-text">Username :</label>
          <input
            name="username"
            maxLength={30}
            type="text"
            required
            className="form-control invert py-3"
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
