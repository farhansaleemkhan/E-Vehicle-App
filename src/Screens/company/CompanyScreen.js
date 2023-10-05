import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import {
  allCompaniesColumns,
  companyScreenTabsForAdmin,
  companyScreenTabsForCompanyOwner,
} from "../../constants/data/companies";
import { companyService } from "../../services/company/companyService";
import { getLocalStorageItem } from "../../utils/localStorage";

export default function ComapniesScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={companyScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={companyScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "employe" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}
    </div>
  );
}

export function SearchCompany() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [searchedCompany, setSearchedEmployee] = useState([]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany.id) fetchSpecificCompany(selectedCompany.id);
  }, [selectedCompany]);

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

  const fetchSpecificCompany = async (companyId) => {
    try {
      const response = await companyService.getCompanies(companyId);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setSearchedEmployee(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="Search Company by Username:" showDropdown>
          <div style={{ margin: "2rem 0" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="username"
              placeholder="Select Company."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allCompanies}
              selectedItem={selectedCompany}
              setSelectedItem={setSelectedCompany}
            ></DropdownSearhable>
          </div>

          <div className="table-container">
            <Table tableColumns={allCompaniesColumns} tableBody={searchedCompany} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

export function AllCompanies() {
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
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="All Companies:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allCompaniesColumns} tableBody={allCompanies} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}
