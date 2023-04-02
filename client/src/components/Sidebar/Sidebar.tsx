import { FC, useState } from "react";
import "./sidebar.css";
import profile from "../../assets/demo/profile.jpg";
import { Link } from "react-router-dom";
interface menuType {
  icon: string;
  name: string;
  pic?: boolean;
}
const Sidebar: FC = () => {
  const menuItems: menuType[] = [
    {
      icon: "home",
      name: "Home",
    },
    {
      icon: "search",
      name: "Search",
    },
    {
      icon: "add_circle",
      name: "Create",
    },
    {
      icon: profile,
      name: "Profile",
      pic: true,
    },
  ];
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const handleOpenSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <nav
      className={`d-flex flex-column px-2  py-4 sidebar ${
        sidebarOpen ? "active" : ""
      }`}
    >
      <div
        onClick={handleOpenSidebar}
        className="logo d-flex fs-2 align-items-center gap-3 pointer px-2"
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
        {menuItems.map((item, idx) => (
          <li
            key={item.name + idx}
            className="d-flex menu-item align-items-center gap-3 pointer"
          >
            {item.pic ? (
              <img
                className="menu-profile"
                src={item.icon}
                width={30}
                alt="profile pic"
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
        ))}
      </ul>
      <br />
      <br />
      <div
        style={{ fontSize: "14px" }}
        className={`text-center secondary-text side-text ${
          sidebarOpen ? "active" : ""
        }`}
      >
        <Link to="/signin">Sign In</Link> to react, create and grow. New here{" "}
        <Link to="/signup">create an account</Link>
      </div>
    </nav>
  );
};

export default Sidebar;
