import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { allEmployeesColumns } from "../../constants/data/employees";
import { employeeService } from "../../services/company/employeeService";

export default function EmployeesScreen() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [searchedEmployee, setSearchedEmployee] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  useEffect(() => {
    if (selectedEmployee.id) fetchEmployeeDetails(selectedEmployee.id);
  }, [selectedEmployee]);

  const fetchAllEmployees = async () => {
    try {
      const response = await employeeService.getEmployees();
      console.log("employeerespone ", response);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedVehicleId: item.assignedVehicleId ? item.assignedVehicleId : "N/A",
        companyId: item.companyId,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllEmployees(tableBodyData);
    } catch (error) {}
  };

  const fetchEmployeeDetails = async (employeId) => {
    try {
      const response = await employeeService.getEmployees(employeId);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedVehicleId: item.assignedVehicleId ? item.assignedVehicleId : "N/A",
        companyId: item.companyId,
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
        <DetailsContainer title="All Employees:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allEmployeesColumns} tableBody={allEmployees} />
          </div>
        </DetailsContainer>

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
      </div>
    </>
  );
}
