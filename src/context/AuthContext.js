import { useEffect, useReducer, createContext } from "react";
import AuthReducer from "./AuthReducer";
import { auth } from "../services/authService";

const INITIAL_STATE = {
  currentUser: auth.getCurrentUserDetails(),
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //   useEffect(() => {
  //     localStorage.setItem("user", JSON.stringify(state.currentUser));
  //   }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
