import { FC, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { User } from "../interfaces/User";
import { UserAuth, UserType } from "../contexts/AuthContext";
import ProfileView from "../components/Profile/ProfileView";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../config";
import Error from "../components/Error/Error";
import Spinner from "../components/Spinners/Spinner";
import { EditData, EditType, actionTypes } from "../contexts/EditContext";
import followUser from "../utils/followUser";

const Profile: FC = () => {
  const { authState } = useContext(UserAuth) as UserType;
  const { editDispatch } = useContext(EditData) as EditType;
  const [profile, setProfile] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let { username } = useParams();
  const getProfileData = () => {
    const name = username?.includes("@") ? username?.split("@")[1] : username;
    axios
      .get(`user/${name}`)
      .then(async (res: any) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            setProfile(data);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProfileData();
  }, [username]);

  const handleToEdit = () => {
    editDispatch({ type: actionTypes.SETPROFILE, payload: profile });
    navigate("/edit");
  };
  const handleFollow = async () => {
    const res = await followUser(
      profile?._id as string,
      authState.user?._id as string
    );
    const { error, status } = res;
    if (status === "error") setError(error);
    else if (status === "ok") {
      getProfileData();
    }
  };
  return (
    <>
      {error ? <Error setError={setError} error={error} /> : ""}

      <div className="d-flex gap-2 w-100">
        <Sidebar />
        <div className="d-flex w-100 flex-column align-items-center gap-4 container my-3 mt-5">
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <ProfileView
              handleEdit={handleToEdit}
              handleFollow={handleFollow}
              profile={profile as User}
              isLoggedIn={authState.user?._id === profile?._id ? true : false}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
