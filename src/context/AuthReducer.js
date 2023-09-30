import { auth } from "../services/authService";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }

    case "LOGOUT": {
      auth.logout();
      return {
        currentUser: null,
      };
    }

    default:
      return state;
  }
};

export default AuthReducer;
