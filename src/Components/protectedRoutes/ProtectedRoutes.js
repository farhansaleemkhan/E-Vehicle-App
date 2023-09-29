import React from "react";
import { Route, Routes } from "react-router-dom";

import { links } from "../../constants/routes";
import { PrivateRoutes } from "../../utils/validatePermissions";

function AppRoutes() {
  return (
    <Routes>
      {links.map((route) => {
        return (
          <Route
            path={route.path}
            {...route.others}
            element={
              <PrivateRoutes permissions={route.permissions}>{<route.component />}</PrivateRoutes>
            }
          />
        );
      })}
    </Routes>
  );
}

export default AppRoutes;
