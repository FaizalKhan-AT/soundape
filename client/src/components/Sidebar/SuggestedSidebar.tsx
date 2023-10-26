import { FC, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import axios from "../../config";
import { User } from "../../interfaces/User";
import Error from "../Error/Error";
import Spinner from "../Spinners/Spinner";
import followUser from "../../utils/followUser";

const SuggestedSidebar: FC = () => {
  const { logoutUser, authState } = useContext<UserType>(UserAuth);
  const [error, setError] = useState<string>("");
  const [creators, setCreators] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = authState;
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;
  const navigate = useNavigate();
  const fetchSuggestedCreators = () => {
    setLoading(true);
    axios
      .get("/guest/suggested")
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            setError(err);
            return;
          case "ok":
            setCreators(data);
            break;
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setLoading(false);
      });
  };

  const handleFollow = async (id: string, profileId: string) => {
    const res = await followUser(id, profileId);
    const { error, status } = res;
    if (status === "error") setError(error);
  };
  useEffect(() => {
    fetchSuggestedCreators();
  }, []);

  return (
    <>
      {error ? <Error error={error} setError={setError} /> : ""}
      <div className="card suggested-card px-3 py-4">
        {authState.isLoggedIn ? (
          <div className="logged-user d-flex align-items-center gap-4 pointer">
            <span
              onClick={() => navigate(`/@${user?.username}`)}
              className="d-flex align-items-center gap-4 pointer"
            >
              <img
                src={user ? IMAGE_BASE_URI + user?.profileImg : ""}
                width={60}
                height={60}
                style={{ objectFit: "cover" }}
                className="rounded-circle"
                alt={user ? user.username : "profile picture"}
              />
              <div className="d-flex align-items-center gap-2 justify-content-center gap-1">
                <div className="d-flex justify-content-center flex-column gap-1">
                  <span className="displayname">
                    {user ? user.username : ""}
                  </span>
                  <span className="username">
                    {user ? user.displayname : ""}
                  </span>
                </div>
                {user?.verified ? (
                  <span
                    title="verified account"
                    className="pointer material-symbols-outlined text-primary"
                  >
                    verified
                  </span>
                ) : (
                  ""
                )}
              </div>
            </span>
            <span
              style={{ fontSize: "14px" }}
              className="fw-bold text-decoration-none text-primary"
              onClick={logoutUser}
            >
              Logout
            </span>
          </div>
        ) : (
          ""
        )}
        <br />
        <div className="divider"></div>
        <br />
        <div
          style={{ height: 270, overflowY: "scroll" }}
          className="w-100 suggested-users d-flex flex-column gap-3"
        >
          <div className="w-100 d-flex align-items-center justify-content-between">
            <span className="secondary-text fw-bold">Suggested for you</span>
            {/* <span className="fw-bold pointer">see all</span> */}
          </div>
          {loading ? (
            <div className="d-flex justify-content-center my-4">
              <Spinner size="lg" />
            </div>
          ) : creators && creators.length > 0 ? (
            creators.map((creator) => {
              if (creator._id === user?._id) return;
              return (
                <div
                  key={creator._id}
                  className=" my-2 w-100 suggested-user d-flex align-items-center gap-4 pointer"
                >
                  <img
                    onClick={() => navigate(`/@${creator.username}`)}
                    src={IMAGE_BASE_URI + creator.profileImg}
                    width={40}
                    height={40}
                    style={{ objectFit: "cover" }}
                    className="rounded-circle"
                    alt="profile-pic"
                  />

                  <div
                    onClick={() => navigate(`/@${creator.username}`)}
                    className="w-100 d-flex align-items-start "
                  >
                    <div className="d-flex flex-column justify-content-center gap-1">
                      <span
                        style={{ fontSize: "12px" }}
                        className="displayname"
                      >
                        {creator.username}
                      </span>
                      <span style={{ fontSize: "12px" }} className="username">
                        {creator.displayname}
                      </span>
                    </div>
                    {creator.verified ? (
                      <span
                        style={{ fontSize: "15px" }}
                        title="verified account"
                        className="pointer material-symbols-outlined text-primary"
                      >
                        verified
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <span
                    style={{ fontSize: "13px" }}
                    onClick={() =>
                      authState.isLoggedIn
                        ? handleFollow(
                            creator._id,
                            authState.user?._id as string
                          )
                        : navigate("/signin")
                    }
                    className="fw-bold text-decoration-none text-primary "
                  >
                    Follow
                  </span> */}
                  <span
                    style={{ fontSize: "13px" }}
                    className="fw-bold text-decoration-none text-primary"
                    onClick={() => navigate(`/@${creator.username}`)}
                  >
                    More
                  </span>
                </div>
              );
            })
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default SuggestedSidebar;
