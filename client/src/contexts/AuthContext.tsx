import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { User } from "../interfaces/User";
import axios from "../config";
// @type
type Props = {
  children: ReactNode;
};
// @enum
enum actionTypes {
  LOGOUT = "LOGOUT",
  SETUSER = "SETUSER",
}
// @interfaces
// type of context for user
export interface UserType {
  authState: AuthState;
  authDispatch: React.Dispatch<Actions>;
  getUser: (token: string) => void;
  logoutUser: () => void;
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
}

// @reducer function
const AuthReducer = (state: AuthState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SETUSER:
      return {
        isLoggedIn: true,
        user: payload,
      };
    case actionTypes.LOGOUT:
      return {
        isLoggedIn: false,
        user: payload,
      };
    default:
      return state;
  }
};
const initalState = {
  user: null,
  isLoggedIn: false,
};
// @create contexts
export const UserAuth = createContext<UserType>({
  authState: initalState,
  authDispatch: () => null,
  getUser: () => null,
  logoutUser: () => null,
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
  // @getuser() - authorizes and gets user details and set user state;
  const getUser = (token: string) => {
    axios
      .get("auth/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            console.error(err);
            return;
          case "ok":
            authDispatch({ type: actionTypes.SETUSER, payload: data });
            return;
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getUser(token);
  }, []);
  return (
    <UserAuth.Provider value={{ authState, authDispatch, getUser, logoutUser }}>
      {children}
    </UserAuth.Provider>
  );
};

export default AuthContext;
