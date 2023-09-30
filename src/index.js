import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./styles/components.css";
import "./styles/screens.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import Toaster from "./Components/Toaster";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
