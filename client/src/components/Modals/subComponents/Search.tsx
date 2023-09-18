import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../config";
import { User } from "../../../interfaces/User";
import { getImageBaseURL } from "../../../utils/general";
import LikeCard from "../../Cards/LikeCard";
import Spinner from "../../Spinners/Spinner";

const Search: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [profiles, setProfiles] = useState<User[]>([]);
  const [msg, setMsg] = useState<string>("");

  function fetchUsers() {
    setLoading(true);
    axios
      .get("/user")
      .then((res) => {
        const { data, status, error } = res.data;
        switch (status) {
          case "ok":
            setProfiles(data);
            break;
          case "error":
            setMsg(error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("something went wrong..");
        setMsg(err.response.data.error);
      });
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  let searchItems = useMemo(() => {
    return profiles.filter((profile) => {
      if (profile.username.toLowerCase().includes(search)) return profile;
      else if (profile.displayname.toLowerCase().includes(search))
        return profile;
    });
  }, [profiles, search]);
  return (
    <>
      <br />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="search"
        className="form-control fs-5 form-control-invert py-2 px-3 w-100"
        placeholder="Search"
      />
      <br />
      <div
        style={{ overflowY: "auto", maxHeight: 386 }}
        className="comment-card-container"
      >
        {loading ? (
          <div className="text-center py-3 ">
            <Spinner size="lg" />
          </div>
        ) : searchItems && searchItems.length > 0 ? (
          searchItems.map((item) => {
            return <SearchCard data={item} key={item._id} />;
          })
        ) : (
          <h4 className="text-center my-2">
            <br />
            {msg ? msg : "Search to find more people..."}
          </h4>
        )}
      </div>
    </>
  );
};
const SearchCard: FC<{ data: User }> = ({ data: profile }) => {
  const navigate = useNavigate();
  const imageBase: string = getImageBaseURL();
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div
          onClick={() => navigate(`/@${profile?.username}`)}
          className="d-flex align-items-center gap-3 my-2 p-3 comment-card"
        >
          <img
            src={imageBase + profile?.profileImg}
            alt={profile?.displayname}
            width={60}
            height={60}
            style={{ objectFit: "cover" }}
            className="rounded-circle pointer"
          />
          <div className="d-flex flex-column pointer justify-content-between">
            <span>{profile?.username}</span>
            <span className="fs-5 text-muted">{profile?.displayname}</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Search;
