import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { allDepartmentsColumns } from "../../constants/data/departments";
import { companyService } from "../../services/company/companyService";
import { departmentService } from "../../services/company/departmentService";

export default function DepartmentsScreen() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [departmentsForSpecificCompany, setDepartmentsForSpecificCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchAllCompanies();
    fetchAllDepartments();
  }, []);

  useEffect(() => {
    if (selectedCompany.id) fetchDepartmentsForSpecificCompany(selectedCompany.id);
  }, [selectedCompany]);

  const fetchAllCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();

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

  const fetchAllDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments("", "");
      let tableBodyData = response.data.map((item) => ({
        name: item.name,
        belongsToCompany: item.companyId.userId.fullName,
      }));
      setAllDepartments(tableBodyData);
    } catch (error) {}
  };

  const fetchDepartmentsForSpecificCompany = async (id) => {
    try {
      const response = await departmentService.getAllDepartments("", id);
      let tableBodyData = response.data.map((item) => ({
        name: item.name,
        belongsToCompany: item.companyId.userId.fullName,
      }));
      setDepartmentsForSpecificCompany(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="Search Departments For Specific Company:" showDropdown>
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
            <Table tableColumns={allDepartmentsColumns} tableBody={departmentsForSpecificCompany} />
          </div>
        </DetailsContainer>

        <DetailsContainer title="All Departments:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allDepartmentsColumns} tableBody={allDepartments} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
