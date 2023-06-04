import { FC, useContext, useRef, useState } from "react";
import LoadingButton from "../Buttons/LoadingButton";
import Error from "../Error/Error";
import { PostType } from "../../Pages/Create";
import { UserAuth, UserType } from "../../contexts/AuthContext";
interface Props {
  loading: boolean;
  handleSubmit: (data: PostType) => void;
}
const PostForm: FC<Props> = ({ loading, handleSubmit }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const { authState } = useContext(UserAuth) as UserType;
  const handleFileChanged = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const [file] = target.files as FileList;
    setFile(file);
  };
  const validateData = () => {
    if (file === null) {
      setError("Upload an audio File...");
      return false;
    }
    if (title === "") {
      setError("Please enter your thoughts..");
      return false;
    }
    return true;
  };
  const handleChange = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateData()) return;
    setError("");
    const userId = authState.user?._id as string;
    const format = file?.type as string;

    handleSubmit({ file, title, userId, format });
  };
  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <form
        onSubmit={onSubmit}
        className="w-100 container row justify-content-center gap-5"
      >
        <div className="d-flex align-items-center gap-3 justify-content-center dashed-border col-md-7 py-4">
          <input
            onChange={handleFileChanged}
            ref={fileRef}
            type="file"
            name="audioFile"
            hidden
            accept="audio/*"
          />
          <button
            type="button"
            onClick={() => {
              setFile(null);
              fileRef.current?.click();
            }}
            className="btn btn-bg p-3 d-flex align-items-center gap-2  justify-content-center"
          >
            <span className="material-symbols-outlined">upload_file</span>
            Choose a file
          </button>
          {file ? (
            <audio
              src={file ? URL.createObjectURL(file) : ""}
              controls
              muted
              controlsList={"nodownload"}
            ></audio>
          ) : (
            ""
          )}
        </div>
        <div className="d-flex align-items-center gap-3 justify-content-center col-md-7 py-4">
          <input
            type="text"
            value={title}
            onChange={handleChange}
            className="form-control invert px-3 py-3"
            name="title"
            placeholder="Share your thoughts...."
            required
          />
        </div>
        <div className="d-flex align-items-center gap-3 justify-content-center col-md-12 py-4">
          <LoadingButton
            style="btn btn-bg col-md-2 py-2 fw-bold"
            type="submit"
            text="Post now"
            loading={loading}
          />
        </div>
      </form>
    </>
  );
};

export default PostForm;
