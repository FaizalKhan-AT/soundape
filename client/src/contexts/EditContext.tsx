import React, { FC, ReactNode, createContext, useReducer } from "react";
import { User } from "../interfaces/User";
type Props = {
  children: ReactNode;
};
export enum actionTypes {
  SETPROFILE = "SETPROFILE",
}
export interface EditType {
  EditStates: EditStateType;
  editDispatch: React.Dispatch<Actions>;
}
interface EditStateType {
  profile: User | null;
}
const initalState = {
  profile: null,
};
interface Actions {
  type: actionTypes;
  payload: any;
}
export const EditData = createContext<EditType>({
  EditStates: initalState,
  editDispatch: () => null,
});
const dispatcher = (state: EditStateType, actions: Actions) => {
  const { type, payload } = actions;
  switch (type) {
    case actionTypes.SETPROFILE:
      return { ...state, profile: payload };
    default:
      return state;
  }
};
const EditContext: FC<Props> = ({ children }) => {
  const [EditStates, editDispatch] = useReducer(dispatcher, initalState);
  return (
    <EditData.Provider value={{ EditStates, editDispatch }}>
      {children}
    </EditData.Provider>
  );
};

export default EditContext;
