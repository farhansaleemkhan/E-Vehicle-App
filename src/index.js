import React from "react";
import ReactDOM from "react-dom/client";
import Toaster from "./Components/Toaster";

import "./index.css";
import "./styles/components.css";
import "./styles/screens.css";
import App from "./App";
import { UserContextProvider } from "./context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster />
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>
);
