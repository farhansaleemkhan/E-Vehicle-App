import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import {
  companyDetailsScreenTabsForAdmin,
  companyDetailsScreenTabsForCompanyOwner,
} from "../../constants/data/companies";
import { companyService } from "../../services/company/companyService";
import { getLocalStorageItem } from "../../utils/localStorage";
import DetailsInfo from "../../Components/DetailsInfo";
import { vehicleDetailsScreenTabsForEmployee } from "../../constants/data/vehicles";
import { employeeService } from "../../services/company/employeeService";

// export default function VehicleDetailsScreen() {
//   const userType = getLocalStorageItem("userType");

//   return (
//     <div className="mt-3 ml-3 mr-3">
//       {userType === "admin" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}

//       {userType === "company" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}

//       {userType === "employe" && (
//         <Tabs defaultActiveKey="1" items={vehicleDetailsScreenTabsForEmployee} onChange={() => {}} />
//       )}
//     </div>
//   );
// }
