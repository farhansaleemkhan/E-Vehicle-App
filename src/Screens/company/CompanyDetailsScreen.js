import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import {
  companyDetailsScreenTabsForAdmin,
  companyDetailsScreenTabsForCompanyOwner,
} from "../../constants/data/companies";
import { companyService } from "../../services/company/companyService";
import { getLocalStorageItem } from "../../utils/localStorage";
import DetailsInfo from "../../Components/DetailsInfo";

export default function ComapnyDetailsScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={companyDetailsScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={companyDetailsScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "employe" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}
    </div>
  );
}

export function CompanyDetails() {
  const [companyDetails, setCompanyDetails] = useState({});
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    fetchCompanyDetails(id);
  }, []);

  useEffect(() => {}, [companyDetails]);

  const fetchCompanyDetails = async (companyId) => {
    try {
      const response = await companyService.getCompanies(companyId);
      setCompanyDetails(response.data[0].userId);
    } catch (error) {}
  };

  return <DetailsInfo obj={companyDetails} />;
}
