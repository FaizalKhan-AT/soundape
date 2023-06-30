import { FC, useState, useContext } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostForm from "../components/Forms/PostForm";
import axios from "../config";
import Error from "../components/Error/Error";
import { useNavigate } from "react-router-dom";
import { EditData, EditType, actionTypes } from "../contexts/EditContext";
import { UserAuth, UserType } from "../contexts/AuthContext";
export type PostType = {
  file: File | null;
  title: string;
  userId: string;
  format: string;
};
const Create: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { editDispatch } = useContext(EditData) as EditType;
  const { authState } = useContext(UserAuth) as UserType;
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleUpload = (data: PostType) => {
    setLoading(true);
    axios
      .post(
        "posts/",
        {
          ...data,
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
  const toEditPage = () => {
    editDispatch({ type: actionTypes.SETPROFILE, payload: authState.user });
    navigate("/edit");
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}
      <div className="d-flex gap-2 w-100">
        <Sidebar />
        <div className="d-flex w-100 flex-column align-items-center gap-4">
          {authState.user?.mode ? (
            <>
              <h2 className="w-100 my-3 text-center">Create a new post</h2>
              <br />
              <PostForm handleSubmit={handleUpload} loading={loading} />
            </>
          ) : (
            <div className="text-center d-flex justify-content-center flex-column align-item-center mt-5">
              <h4>😢Sorry you are not a creator, you cannot upload posts</h4>
              <div className="d-flex justify-content-center my-2">
                <p
                  style={{ width: "70%" }}
                  className="text-center text-muted fw-bold"
                >
                  you can switch to creator mode inorder to upload posts. which
                  is publically available. you can turn this mode off at any
                  time in your settings
                </p>
              </div>
              <br />
              <div className="d-flex align-items-center gap-2 justify-content-center">
                <button
                  onClick={toEditPage}
                  className="btn btn-primary py-2 px-5"
                >
                  Switch to Creator
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="btn btn-bg py-2 px-5"
                >
                  Go back
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Create;
