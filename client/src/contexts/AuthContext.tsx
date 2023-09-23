import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { User } from "../interfaces/User";
import axios from "../config";
import { Admin } from "../interfaces/Admin";
// @type
type Props = {
  children: ReactNode;
};
// @enum
enum actionTypes {
  LOGOUT = "LOGOUT",
  SETUSER = "SETUSER",
  SETADMIN = "SETADMIN",
  LOGOUTADMIN = "LOGOUTADMIN",
}
// @interfaces
// type of context for user
export interface UserType {
  authState: AuthState;
  authDispatch: React.Dispatch<Actions>;
  getUser: (token: string) => void;
  getAdmin: (token: string) => void;
  logoutUser: () => void;
  logoutAdmin: () => void;
}
// reducer actions
interface Actions {
  type: actionTypes;
  payload: any;
}
// reducer state
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  admin: Admin | null;
}

// @reducer function
const AuthReducer = (state: AuthState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SETUSER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: payload,
      };
    case actionTypes.LOGOUTADMIN:
      return {
        ...state,
        isAdminLoggedIn: false,
        admin: payload,
      };
    case actionTypes.SETADMIN:
      return {
        ...state,
        isAdminLoggedIn: true,
        admin: payload,
      };
    default:
      return state;
  }
};
const initalState: AuthState = {
  user: null,
  isLoggedIn: false,
  isAdminLoggedIn: false,
  admin: null,
};
// @create contexts
export const UserAuth = createContext<UserType>({
  authState: initalState,
  authDispatch: () => null,
  getUser: () => null,
  getAdmin: () => null,
  logoutUser: () => null,
  logoutAdmin: () => null,
});
// @context component
const AuthContext: FC<Props> = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initalState);
  // @logoutUser() - logs the userout
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    authDispatch({ type: actionTypes.LOGOUT, payload: null });
  };
  // @logoutAdmin() - logs the userout
  const logoutAdmin = () => {
    localStorage.removeItem("atoken");
    localStorage.removeItem("admin");
    authDispatch({ type: actionTypes.LOGOUTADMIN, payload: null });
  };
  function fetchUser(op: { url: string; token: string; type: string }) {
    axios
      .get(op.url, {
        headers: {
          Authorization: `Bearer ${op.token}`,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            console.error(err);
            return;
          case "ok":
            authDispatch({
              type:
                op.type === "admin"
                  ? actionTypes.SETADMIN
                  : actionTypes.SETUSER,
              payload: data,
            });
            return;
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  }
  // @getuser() - authorizes and gets user details and set user state;
  const getUser = (token: string) =>
    fetchUser({ url: "/auth", token, type: "user" });
  const getAdmin = (token: string) =>
    fetchUser({ url: "/auth/admin", token, type: "admin" });

  useEffect(() => {
    const atoken = localStorage.getItem("atoken");
    const token = localStorage.getItem("token");
    if (atoken) getAdmin(atoken);
    if (token) getUser(token);
  }, []);
  return (
    <UserAuth.Provider
      value={{
        authState,
        authDispatch,
        getUser,
        logoutUser,
        logoutAdmin,
        getAdmin,
      }}
    >
      {children}
    </UserAuth.Provider>
  );
};

export default AuthContext;
