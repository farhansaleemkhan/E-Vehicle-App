import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import {
  allDepartmentsColumns,
  departmentScreenTabsForAdmin,
  departmentScreenTabsForCompanyOwner,
} from "../../constants/data/departments";
import { companyService } from "../../services/company/companyService";
import { departmentService } from "../../services/company/departmentService";
import { getLocalStorageItem } from "../../utils/localStorage";
import { showFailureToaster } from "../../utils/toaster";

export default function DepartmentsScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={departmentScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={departmentScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "employe" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}
    </div>
  );
}

export function SearchDepartment() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [departmentsForSpecificCompany, setDepartmentsForSpecificCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany.id) fetchDepartmentsForSpecificCompany(selectedCompany.id);
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
        <>
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
        </>
      </div>
    </>
  );
}

export function AllDepartments() {
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    fetchAllDepartments();
  }, []);

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

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="All Departments:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allDepartmentsColumns} tableBody={allDepartments} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}

export function AllDepartmentsForCompanyOwner() {
  const [allDepartments, setAllDepartments] = useState([]);

  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const fetchAllDepartments = async () => {
    try {
      const response = await departmentService.getAllDepartments("", getLocalStorageItem("companyId"));
      let tableBodyData = response.data.map((item) => ({
        name: item.name,
        belongsToCompany: item.companyId.userId.fullName,
      }));

      setAllDepartments(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="All Departments:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allDepartmentsColumns} tableBody={allDepartments} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}

export function AddDepartmentsForCompanyOwner() {
  const [departmentName, setDepartmentName] = useState("");

  const submitAddDepartment = async () => {
    try {
      await departmentService.addNewDepartment({
        name: departmentName,
        companyId: getLocalStorageItem("companyId"),
      });

      setDepartmentName("");
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Enter Info:" showDropdown>
        <div className="fr" style={{ width: "30rem" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            value={departmentName}
            onChange={(e) => {
              setDepartmentName(e.target.value);
            }}
            required
          />
          <button className="btn buttonDarker m-2" onClick={submitAddDepartment}>
            Add
          </button>
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AddDepartmentsForAdmin() {
  const [departmentName, setDepartmentName] = useState("");
  const [allCompanies, setAllCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

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

  const submitAddDepartment = async () => {
    try {
      if (!selectedCompany?.id) {
        showFailureToaster("Please select company for which you want to add a department.");
        return;
      }

      await departmentService.addNewDepartment({
        name: departmentName,
        companyId: selectedCompany.id,
      });

      setDepartmentName("");
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="Enter Info:" showDropdown>
          <div style={{ margin: "2rem 2rem" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="username"
              placeholder="Select Company."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allCompanies}
              selectedItem={selectedCompany}
              setSelectedItem={setSelectedCompany}
            ></DropdownSearhable>
            <div className="fr" style={{ width: "30rem", margin: "1rem 0" }}>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={departmentName}
                onChange={(e) => {
                  setDepartmentName(e.target.value);
                }}
                required
              />
              <button className="btn buttonDarker m-2" onClick={submitAddDepartment}>
                Add
              </button>
            </div>
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
