import React, { useState, useEffect, useContext } from "react";
import { Tabs } from "antd";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { allEmployeesColumns } from "../../constants/data/employees";
import { employeeService } from "../../services/company/employeeService";
import { AuthContext } from "../../context/AuthContext";

const items = [
  {
    key: "1",
    label: <h4>Search Employee</h4>,
    children: <SearchEmployee />,
  },
  {
    key: "2",
    label: <h4>All Employees</h4>,
    children: <AllEmployees />,
  },
];

export default function EmployeesScreen() {
  return (
    <div className="mt-3 ml-3 mr-3">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={() => {}}
        // tabBarStyle={{ background: "red", color: "white" }}
      />
    </div>
  );
}

function SearchEmployee() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchedEmployee, setSearchedEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee.id) fetchSpecificEmployee(selectedEmployee.id);
  }, [selectedEmployee]);

  const fetchAllEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedVehicleId: item.assignedVehicleId ? item.assignedVehicleId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllEmployees(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificEmployee = async (employeId) => {
    try {
      const response = await employeeService.getEmployees(employeId);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedVehicleId: item.assignedVehicleId ? item.assignedVehicleId : "N/A",
        companyId: item.companyId.userId.username,
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
        <>
          <DetailsContainer title="Search Employee by Username:" showDropdown>
            <div style={{ margin: "2rem 0" }}>
              <DropdownSearhable
                idkey="id"
                displayKey="username"
                placeholder="Select Employee."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={allEmployees}
                selectedItem={selectedEmployee}
                setSelectedItem={setSelectedEmployee}
              ></DropdownSearhable>
            </div>

            <div className="table-container">
              <Table tableColumns={allEmployeesColumns} tableBody={searchedEmployee} />
            </div>
          </DetailsContainer>
        </>
        {/* )} */}
      </div>
    </>
  );
}

function AllEmployees() {
  const [allEmployees, setAllEmployees] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedVehicleId: item.assignedVehicleId ? item.assignedVehicleId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllEmployees(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="All Employees:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allEmployeesColumns} tableBody={allEmployees} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}
