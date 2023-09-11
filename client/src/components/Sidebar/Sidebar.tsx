import { FC, useState, useContext } from "react";
import "./sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth, UserType } from "../../contexts/AuthContext";
interface menuType {
  icon: string;
  name: string;
  to: string;
  pic?: boolean;
}
const Sidebar: FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleOpenSidebar = () => setSidebarOpen(!sidebarOpen);
  const { authState, logoutUser } = useContext<UserType>(UserAuth);
  const IMAGE_BASE_URI = import.meta.env.VITE_IMAGE_BASE_URL;
  const { user } = authState;
  const navigate = useNavigate();
  const menuItems: menuType[] = [
    {
      icon: "home",
      name: "Home",
      to: "/",
    },
    {
      icon: "search",
      name: "Search",
      to: "/search",
    },
    {
      icon: "add_circle",
      name: "Create",
      to: "/create",
    },

    {
      icon: "",
      name: "Profile",
      pic: true,
      to: "",
    },
  ];
  return (
    <nav
      className={`d-flex flex-column px-2  py-4 sidebar ${
        sidebarOpen ? "active" : ""
      }`}
    >
      <div
        onClick={handleOpenSidebar}
        className="logo d-flex  fs-2 align-items-center gap-3 pointer px-2 "
      >
        <span style={{ fontSize: "42px" }} className="material-symbols-rounded">
          graphic_eq
        </span>
        <span className="fw-bold app-name pointer">
          <span className="font-outlined">S</span>
          oundape
        </span>
      </div>
      <br />
      <ul className="d-flex flex-column px-2 my-3 gap-4 menu-container">
        {menuItems.map((item, idx) => {
          if (item.name === "Profile" && authState.isLoggedIn === false) return;
          return (
            <li
              key={item.name + idx}
              onClick={() =>
                navigate(
                  item.name === "Profile"
                    ? `/@${authState.user?.username}`
                    : item.to
                )
              }
              className={`${
                sidebarOpen ? "" : "hover"
              } d-flex menu-item align-items-center gap-3 pointer`}
            >
              {item.pic ? (
                <img
                  className="menu-profile"
                  src={user ? IMAGE_BASE_URI + user.profileImg : ""}
                  width={30}
                  height={30}
                  style={{ objectFit: "cover" }}
                  alt={user ? user.username : "profile picture"}
                />
              ) : (
                <span
                  className={`${
                    item.name === "Home" ? "active" : ""
                  } material-symbols-rounded menu-icon`}
                >
                  {item.icon}
                </span>
              )}
              <span style={{ fontSize: "17px" }} className="mt-1">
                {item.name}
              </span>
            </li>
          );
        })}
      </ul>
      <br />
      <br />

      {authState.isLoggedIn ? (
        <button
          onClick={logoutUser}
          className="btn fw-bold logout-btn d-flex align-items-center gap-2 justify-content-center"
        >
          <span className="material-symbols-outlined fs-2">logout</span>
          {sidebarOpen ? "" : "Logout"}
        </button>
      ) : (
        <div
          style={{ fontSize: "14px" }}
          className={`text-center secondary-text side-text ${
            sidebarOpen ? "active" : ""
          }`}
        >
          <Link to="/signin">Sign In</Link> to react, create and grow. New here{" "}
          <Link to="/signup">create an account</Link>
        </div>
      )}
    </nav>
  );
};

export default Sidebar;
