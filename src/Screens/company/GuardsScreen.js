import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import {
  allGuardsColumns,
  guardScreenTabsForAdmin,
  guardScreenTabsForCompanyOwner,
} from "../../constants/data/guard";
import { guardService } from "../../services/company/guardService";
import { getLocalStorageItem } from "../../utils/localStorage";
import { companyService } from "../../services/company/companyService";
import { showFailureToaster } from "../../utils/toaster";
import { departmentService } from "../../services/company/departmentService";
import Error from "../../Components/Error";

export default function GuardsScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={guardScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={guardScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "guard" && <Tabs defaultActiveKey="1" items={[]} onChange={() => {}} />}
    </div>
  );
}

export function SearchGuard() {
  const [allGuards, setAllGuards] = useState([]);
  const [searchedGuard, setSearchedGuard] = useState([]);
  const [selectedGuard, setSelectedGuard] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    fetchAllGuards();
  }, []);

  useEffect(() => {
    if (isListEmpty === true) setSearchedGuard([]);
  }, [isListEmpty]);

  useEffect(() => {
    if (selectedGuard.id) fetchSpecificGuard(selectedGuard.id);
  }, [selectedGuard]);

  const fetchAllGuards = async () => {
    try {
      const response = await guardService.getEmployees();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedParkingId: item.assignedParkingId ? item.assignedParkingId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllGuards(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificGuard = async (guardId) => {
    try {
      const response = await guardService.getGuards(guardId);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedParkingId: item.assignedParkingId ? item.assignedParkingId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setSearchedGuard(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Search Guard by Name:" showDropdown>
        <div style={{ margin: "2rem 0" }}>
          <DropdownSearhable
            idkey="id"
            displayKey="username"
            placeholder="Click here to search."
            // style={styles.dropDown.smallDropDownWithoutBorder}
            list={allGuards}
            selectedItem={selectedGuard}
            setSelectedItem={setSelectedGuard}
            setIsListEmpty={setIsListEmpty}
            isListEmpty={isListEmpty}
          ></DropdownSearhable>
        </div>

        {isListEmpty && <Error message="No Data found" />}

        <div className="table-container">
          <Table tableColumns={allGuardsColumns} tableBody={searchedGuard} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AllGuards() {
  const [allGuards, setAllGuards] = useState([]);

  useEffect(() => {
    fetchAllGuards();
  }, []);

  const fetchAllGuards = async () => {
    try {
      const response = await guardService.getGuards();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedParkingId: item.assignedParkingId ? item.assignedParkingId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllGuards(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="" showDropdown>
        <div className="table-container">
          <Table tableColumns={allGuardsColumns} tableBody={allGuards} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AllGuardsForCompanyOwner() {
  const [allGuards, setAllGuards] = useState([]);

  useEffect(() => {
    fetchAllGuards();
  }, []);

  const fetchAllGuards = async () => {
    try {
      const response = await guardService.getGuards("", getLocalStorageItem("companyId"));

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        username: item.userId.username,
        fullName: item.userId.fullName,
        assignedParkingId: item.assignedParkingId ? item.assignedParkingId : "N/A",
        companyId: item.companyId.userId.username,
        email: item.userId.email,
        address: item.userId.address,
        city: item.userId.city,
        country: item.userId.country,
      }));

      setAllGuards(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      {/* <DetailsContainer title="All Employees:" showDropdown> */}
      <DetailsContainer title="" showDropdown>
        <div className="table-container">
          <Table tableColumns={allGuardsColumns} tableBody={allGuards} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AddGuardForCompanyOwner() {
  const [guard, setGuard] = useState({
    companyId: getLocalStorageItem("companyId"),
    // departmentId: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    type: "guard",
  });
//   const [departmentsForSpecificCompany, setDepartmentsForSpecificCompany] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");

//   useEffect(() => {
//     fetchDepartmentsForSpecificCompany(getLocalStorageItem("companyId"));
//   }, []);

//   useEffect(() => {
//     if (selectedDepartment.id) setEmployee((prev) => ({ ...prev, departmentId: selectedDepartment.id }));
//   }, [selectedDepartment]);

//   const fetchDepartmentsForSpecificCompany = async (id) => {
//     try {
//       const response = await departmentService.getAllDepartments("", id);
//       let tableBodyData = response.data.map((item) => ({
//         id: item._id,
//         name: item.name,
//       }));

//       setDepartmentsForSpecificCompany(tableBodyData);
//     } catch (error) {}
//   };

  //
  const handleChange = (e) => {
    setGuard((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = guardService.guardSchema.validate(guard);
      if (error) return showFailureToaster(error.message);

      await guardService.addGuard({
        ...guard,
      });

      setGuard({
        companyId: getLocalStorageItem("companyId"),
        // departmentId: "",
        username: "",
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        type: "guard",
      });
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Enter Info:" showDropdown>
        <form className="form" autoComplete="on" onSubmit={handleSubmit}>
          <div
            className="custom-form bg-white rounded p-5 fr"
            style={{
              flexWrap: "wrap",
              // overflow: "auto",
              columnGap: "10rem",
              rowGap: "1rem",
            }}
          >
            {/* <div className="mb-3">
            <label for="upload" className="file-label">
              <span
              //  className="file-icon"
              >
                📁
              </span>
              Upload Profile Pic
            </label>
            <input
              className="form-control input form-control input-sm"
              type="file"
              id="upload"
              //   className="file-input"
              onChange={handleUploadImage}
            />
          </div> */}

            <div>
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                type="text"
                placeholder="Enter @username."
                className="form-control input"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter full name."
                className="form-control input"
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="text"
                placeholder="Enter email address."
                className="form-control input"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password."
                className="form-control input"
                onChange={handleChange}
                autoComplete="password"
              />
            </div>

            <div>
              <label htmlFor="phone">Phone No:</label>
              <input
                name="phone"
                type="phone"
                placeholder="Enter phone."
                className="form-control input"
                onChange={handleChange}
                autoComplete="phone"
              />
            </div>

            <div>
              <label htmlFor="address">Address:</label>
              <input
                name="address"
                type="address"
                placeholder="Enter address."
                className="form-control input"
                onChange={handleChange}
                autoComplete="address"
              />
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <input
                name="country"
                type="country"
                placeholder="Enter country."
                className="form-control input"
                onChange={handleChange}
                autoComplete="country"
              />
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                name="city"
                type="city"
                placeholder="Enter city."
                className="form-control input"
                onChange={handleChange}
                autoComplete="city"
              />
            </div>

            {/* <div style={{ margin: "2rem 0" }}>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Department."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={departmentsForSpecificCompany}
                selectedItem={selectedDepartment}
                setSelectedItem={setSelectedDepartment}
              ></DropdownSearhable>
            </div> */}

            <div style={{ height: "1rem", alignSelf: "center" }}>
              <button className="btn buttonDarker " type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      </DetailsContainer>
    </div>
  );
}

export function AddGuardForAdmin() {
  const [allCompanies, setAllCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");

  const [guard, setGuard] = useState({
    companyId: "",
    // departmentId: "",
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    type: "guard",
  });
//   const [departmentsForSpecificCompany, setDepartmentsForSpecificCompany] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany.id) {
    //   fetchDepartmentsForSpecificCompany(selectedCompany.id);
      setGuard((prev) => ({ ...prev, companyId: selectedCompany.id }));
    }
  }, [selectedCompany.id]);

//   useEffect(() => {
//     if (selectedDepartment.id) setEmployee((prev) => ({ ...prev, departmentId: selectedDepartment.id }));
//   }, [selectedDepartment]);

  //
  const handleChange = (e) => {
    setGuard((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = guardService.guardSchema.validate(guard);
      if (error) return showFailureToaster(error.message);

      await guardService.addGuard({
        ...guard,
      });

      setGuard({
        companyId: "",
        // departmentId: "",
        username: "",
        fullName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        type: "guard",
      });
    } catch (error) {}
  };

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

//   const fetchDepartmentsForSpecificCompany = async (id) => {
//     try {
//       const response = await departmentService.getAllDepartments("", id);
//       let tableBodyData = response.data.map((item) => ({
//         id: item._id,
//         name: item.name,
//       }));

//       setDepartmentsForSpecificCompany(tableBodyData);
//     } catch (error) {}
//   };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Enter Info:" showDropdown>
        <form className="form" autoComplete="on" onSubmit={handleSubmit}>
          <div
            className="custom-form bg-white rounded p-5 fr"
            style={{
              flexWrap: "wrap",
              // overflow: "auto",
              columnGap: "10rem",
              rowGap: "1rem",
            }}
          >
            {/* <div className="mb-3">
            <label for="upload" className="file-label">
              <span
              //  className="file-icon"
              >
                📁
              </span>
              Upload Profile Pic
            </label>
            <input
              className="form-control input form-control input-sm"
              type="file"
              id="upload"
              //   className="file-input"
              onChange={handleUploadImage}
            />
          </div> */}

            <div>
              <label htmlFor="username">Username:</label>
              <input
                name="username"
                type="text"
                placeholder="Enter @username."
                className="form-control input"
                onChange={handleChange}
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="fullName">Full Name:</label>
              <input
                name="fullName"
                type="text"
                placeholder="Enter full name."
                className="form-control input"
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                type="text"
                placeholder="Enter email address."
                className="form-control input"
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password."
                className="form-control input"
                onChange={handleChange}
                autoComplete="password"
              />
            </div>

            <div>
              <label htmlFor="phone">Phone No:</label>
              <input
                name="phone"
                type="phone"
                placeholder="Enter phone."
                className="form-control input"
                onChange={handleChange}
                autoComplete="phone"
              />
            </div>

            <div>
              <label htmlFor="address">Address:</label>
              <input
                name="address"
                type="address"
                placeholder="Enter address."
                className="form-control input"
                onChange={handleChange}
                autoComplete="address"
              />
            </div>

            <div>
              <label htmlFor="country">Country:</label>
              <input
                name="country"
                type="country"
                placeholder="Enter country."
                className="form-control input"
                onChange={handleChange}
                autoComplete="country"
              />
            </div>

            <div>
              <label htmlFor="city">City:</label>
              <input
                name="city"
                type="city"
                placeholder="Enter city."
                className="form-control input"
                onChange={handleChange}
                autoComplete="city"
              />
            </div>

            <div style={{ margin: "1rem 0" }}>
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

            {/* <div style={{ margin: "1rem 0" }}>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Department."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={departmentsForSpecificCompany}
                selectedItem={selectedDepartment}
                setSelectedItem={setSelectedDepartment}
              ></DropdownSearhable>
            </div> */}

            <div style={{ height: "1rem", alignSelf: "center" }}>
              <button className="btn buttonDarker " type="submit">
                Add
              </button>
            </div>
          </div>
        </form>
      </DetailsContainer>
    </div>
  );
}
