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
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  const fetchAllCompanies = async () => {
    try {
      const response = await companyService.getCompanies();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllCompanies(tableBodyData);
    } catch (error) {}
  };

  return (
    <DetailsInfo
      obj={{
        name: "basit",
        age: "10",
        city: "lahore",
        country: "Paksitan",
        address:
          "house#204/ldahouse# 204/ldahouse#20 4/ldahouse#20 4/ldahouse#204/ldah ouse#204/ldahouse #204/ldahouse#204/ldahou se#204 /ldahouse#204/ldahouse# 204/ldahouse#204/ldahouse#204 /ldahouse#204/ldaho use#20 4/ldahouse#204/lda",
        name1:
          "house#204/ldahouse# 204/ldahouse#20 4/ldahouse#20 4/ldahouse#204/ldah ouse#204/ldahouse #204/ldahouse#204/ldahou se#204 /ldahouse#204/ldahouse# 204/ldahouse#204/ldahouse#204 /ldahouse#204/ldaho use#20 4/ldahouse#204/lda",
        age1: "10",
        city1: "lahore",
        country1: "Paksitan",
        address1: "house#204/lda",
        name2: "basit",
        age2: "10",
        city2: "lahore",
        country2: "Paksitan",
        address2: "house#204/lda",
        name12: "basit",
        age12: "10",
        city12: "lahore",
        country12: "Paksitan",
        // address12: "house#204/lda",
      }}
    />
  );
}
