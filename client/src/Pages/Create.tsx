import { FC, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostForm from "../components/Forms/PostForm";
import axios from "../config";
import Error from "../components/Error/Error";
import { useNavigate } from "react-router-dom";
export type PostType = {
  file: File | null;
  title: string;
  userId: string;
  format: string;
};
const Create: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="d-flex gap-2 w-100">
        <Sidebar />
        <div className="d-flex w-100 flex-column align-items-center gap-4">
          <h2 className="w-100 my-3 text-center">Create a new post</h2>
          <br />
          <PostForm handleSubmit={handleUpload} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Create;
