import { auth } from "../services/authService";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        currentUser: action.payload,
      };
    }

    case "LOGOUT": {
      auth.logout();
      return {
        currentUser: {},
        currentCompany: {},
      };
    }

    case "ADD_COMPANY": {
      return {
        ...state,
        currentCompany: action.payload,
      };
    }

    default:
      return state;
  }
};

export default UserReducer;
