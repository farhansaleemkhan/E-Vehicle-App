import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { allCompaniesColumns } from "../../constants/data/companies";
import { allDepartmentsColumns } from "../../constants/data/departments";
import { companyService } from "../../services/company/companyService";
import { departmentService } from "../../services/company/departmentService";

export default function AllComapniesScreen() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [departmentsForSpecificCompany, setDepartmentsForSpecificCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchAllCompanies();
    fetchAllDepartments();
  }, []);

  useEffect(() => {
    console.log("selectedcompany ", selectedCompany);
    if (selectedCompany.id) fetchDepartmentsForSpecificCompany(selectedCompany.id);
  }, [selectedCompany]);

  const fetchAllCompanies = async () => {
    try {
      const response = await companyService.getAllCompanies();
      console.log("companyressss ", response);

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
      // console.log("ressss ", response);
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
      // const response = await departmentService.getAllDepartments("6516a4006c83f6a40d1237b3");
      console.log("resssswwwdepartment ", response);
      let tableBodyData = response.data.map((item) => ({
        name: item.name,
        belongsToCompany: item.companyId.userId.fullName,
        // companyId: item.companyId._id,
      }));
      setDepartmentsForSpecificCompany(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="All Companies:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allCompaniesColumns} tableBody={allCompanies} />
          </div>
        </DetailsContainer>

        {/* <DetailsContainer title="All Departments:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allDepartmentsColumns} tableBody={allDepartments} />
          </div>
        </DetailsContainer>

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
        </DetailsContainer> */}
      </div>
    </>
  );
}
