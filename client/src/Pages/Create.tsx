import { FC, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import PostForm from "../components/Forms/PostForm";
export type PostType = {
  file: File;
  title: string;
};
const Create: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleUpload = (data: PostType) => {
    console.log(data);
  };
  return (
    <>
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
