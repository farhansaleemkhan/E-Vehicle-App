import { useEffect, useReducer, createContext } from "react";
import UserReducer from "./UserReducer";
import { auth } from "../services/authService";
import { companyService } from "../services/company/companyService";

// async function getInitialState() {
//   let currentUser = auth.getCurrentUserDetails();
//   let currentCompany = await companyService.getMyConpanyDetails(currentUser._id);

//   return { currentUser, currentCompany };
// }

const INITIAL_STATE = {
  currentUser: {},
  currentCompany: {},
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  //   useEffect(() => {
  //     localStorage.setItem("user", JSON.stringify(state.currentUser));
  //   }, [state.currentUser]);

  // useEffect(() => {}, [state]);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};
