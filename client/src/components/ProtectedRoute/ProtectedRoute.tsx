import { FC, ReactElement, useContext } from "react";
import { UserAuth, UserType } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
type Props = {
  children: ReactElement;
};
const ProtectedRoute: FC<Props> = ({ children }) => {
  const { authState } = useContext(UserAuth) as UserType;

  if (window.location.href.includes("/admin") && !authState.isAdminLoggedIn)
    return <Navigate to="/admin/login" />;
  else if (!authState.isLoggedIn) return <Navigate to="/signin" />;
  return children;
};

export default ProtectedRoute;
