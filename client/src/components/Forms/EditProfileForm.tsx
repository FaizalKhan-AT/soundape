import { FC, FormEvent, useContext, useRef, useState } from "react";
import { EditData, EditType } from "../../contexts/EditContext";
import { User } from "../../interfaces/User";
import "./form.css";
import LoadingButton from "../Buttons/LoadingButton";
import { validateEmail, validateUsername } from "../../utils/Validate";
interface Props {
  loading: boolean;
  setError: React.Dispatch<React.SetStateAction<string>>;
  handleUpdate: (data: User, file: File) => void;
}
const EditProfileForm: FC<Props> = ({ loading, handleUpdate, setError }) => {
  const { EditStates } = useContext(EditData) as EditType;
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;
  const [proPic, setProPic] = useState<File>();
  const [profile, setProfile] = useState<User | null>(
    EditStates.profile ? EditStates.profile : null
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setProfile({
      ...profile,
      [target.name]: target.name === "mode" ? !profile?.mode : target.value,
    } as User);
  };
  const handleFileChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    const [file] = target.files as FileList;
    if (!file) return;
    if (file.size > 2000000) {
      setError("upload a image with a size below 2 mb");
      return;
    }
    setProPic(file);
  };
  const validateData = () => {
    if (profile?.email === "") return "Email adress cannot be empty!";
    if (profile?.username === "") return "Username cannot be empty!";
    if (profile?.displayname === "") return "Display name cannot be empty!";
    if (!validateEmail(profile?.email as string))
      return "Entered email address is not valid";
    if (!validateUsername(profile?.username as string))
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
    handleUpdate(profile as User, proPic as File);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-100 d-flex align-items-center justify-content-center gap-3 flex-column container"
    >
      <div className="d-flex align-items-center position-relative">
        <div
          onClick={() => fileRef.current?.click()}
          className="position-absolute pointer start-0 end-0 top-0 bottom-0 edit-pro-overlay"
        >
          <span className="material-symbols-outlined fs-2">edit</span>
        </div>
        <img
          className="rounded-circle"
          src={
            proPic
              ? URL.createObjectURL(proPic)
              : IMAGE_BASE_URI + profile?.profileImg
          }
          alt={profile?.username}
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
        />
        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
        />
      </div>
      <br />
      <div className="row w-100 container">
        <div className="col-md-10 my-2">
          <label className="form-label secondary-text">
            Creator mode : {profile?.mode === true ? "On" : "Off"}
          </label>
          <label className="mode-toggle pointer">
            <input
              onChange={handleChange}
              type="checkbox"
              name="mode"
              className="toggle"
              hidden
              checked={profile?.mode === true ? true : false}
            />
            <div className="circle"></div>
          </label>
        </div>
        <div className="col-md-5 my-2">
          <label className="form-label secondary-text">Username :</label>
          <input
            onChange={handleChange}
            value={profile?.username}
            name="username"
            maxLength={30}
            type="text"
            required
            className="form-control invert py-3"
          />
        </div>
        <div className="col-md-5 my-2">
          <label className="form-label secondary-text">Display name :</label>
          <input
            name="displayname"
            onChange={handleChange}
            value={profile?.displayname}
            type="text"
            required
            className="form-control invert py-3"
          />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label secondary-text">Email :</label>
          <input
            name="email"
            onChange={handleChange}
            value={profile?.email}
            type="text"
            required
            className="form-control invert py-3"
          />
        </div>
        <div className="col-md-10 my-2">
          <label className="form-label secondary-text">Bio :</label>
          <textarea
            rows={4}
            onChange={handleChange}
            value={profile?.profileDesc}
            style={{ resize: "none" }}
            className="form-control invert py-3"
            name="profileDesc"
          ></textarea>
        </div>
        <div className="col-md-10 text-center my-3">
          <LoadingButton
            style="btn btn-primary col-md-5 py-2 fw-bold"
            loading={loading}
            text="Save changes"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
