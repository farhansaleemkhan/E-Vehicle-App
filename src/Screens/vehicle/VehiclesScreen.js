import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import {
  allVehiclesColumns,
  vehicleDetailsScreenTabsForEmployee,
  vehicleScreenTabsForAdmin,
  vehicleScreenTabsForCompanyOwner,
} from "../../constants/data/vehicles";
import { vehicleService } from "../../services/vehicle/vehicleService";
import { getLocalStorageItem } from "../../utils/localStorage";
import { showFailureToaster } from "../../utils/toaster";
import { vehicleTypesService } from "../../services/vehicle/vehicleTypeService";
import { fuelTypesService } from "../../services/vehicle/fuelTypeService";
import { companyService } from "../../services/company/companyService";
import { employeeService } from "../../services/company/employeeService";
import Success from "../../Components/Success";
import Error from "../../Components/Error";
import DetailsInfo from "../../Components/DetailsInfo";

export default function VehiclesScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={vehicleScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={vehicleScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "employee" && (
        <Tabs defaultActiveKey="1" items={vehicleDetailsScreenTabsForEmployee} onChange={() => {}} />
      )}
    </div>
  );
}

export function SearchVehicle() {
  const [allVehicles, setAllVehicles] = useState([]);
  const [searchedVehicle, setSearchedVehicle] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  useEffect(() => {
    if (isListEmpty === true) setSearchedVehicle([]);
  }, [isListEmpty]);

  useEffect(() => {
    if (selectedVehicle.id) fetchSpecificVehicle(selectedVehicle.id);
  }, [selectedVehicle]);

  const fetchAllVehicles = async () => {
    try {
      const response = await vehicleService.getVehicles();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        model: item.model,
        manufacturer: item.manufacturer,
        licensePlateNumber: item.licensePlateNumber,
        chassisNumber: item.chassisNumber,
        vehicleType: item.vehicleType.name,
        isAssigned: item.isAssigned === true ? "Yes" : "No",
        isParked: item.isParked === true ? "Yes" : "No",
        fuelConsumed: item.fuelConsumed,
        fuelGiven: item.fuelGiven,
        fuelType: item.fuelType.name,
        isWorkingFine: item.isWorkingFine === true ? "Yes" : "No",
        company: item.companyId.userId.username,
      }));

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificVehicle = async (vehicleId) => {
    try {
      const response = await vehicleService.getVehicles(`_id=${vehicleId}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        model: item.model,
        manufacturer: item.manufacturer,
        licensePlateNumber: item.licensePlateNumber,
        chassisNumber: item.chassisNumber,
        vehicleType: item.vehicleType.name,
        isAssigned: item.isAssigned === true ? "Yes" : "No",
        isParked: item.isParked === true ? "Yes" : "No",
        fuelConsumed: item.fuelConsumed,
        fuelGiven: item.fuelGiven,
        fuelType: item.fuelType.name,
        isWorkingFine: item.isWorkingFine === true ? "Yes" : "No",
        company: item.companyId.userId.username,
      }));

      setSearchedVehicle(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Search vehicle by No Plate:" showDropdown>
        <div style={{ margin: "2rem 0" }}>
          <DropdownSearhable
            idkey="id"
            displayKey="licensePlateNumber"
            placeholder="Click here to search."
            // style={styles.dropDown.smallDropDownWithoutBorder}
            list={allVehicles}
            selectedItem={selectedVehicle}
            setSelectedItem={setSelectedVehicle}
            setIsListEmpty={setIsListEmpty}
            isListEmpty={isListEmpty}
          ></DropdownSearhable>
        </div>

        {isListEmpty && <Error message="No Data found" />}

        <div className="table-container">
          <Table tableColumns={allVehiclesColumns} tableBody={searchedVehicle} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AllVehicles() {
  const [allVehicles, setAllVehicles] = useState([]);

  useEffect(() => {
    fetchAllVehicles();
  }, []);

  const fetchAllVehicles = async () => {
    try {
      const response = await vehicleService.getVehicles();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        model: item.model,
        manufacturer: item.manufacturer,
        licensePlateNumber: item.licensePlateNumber,
        chassisNumber: item.chassisNumber,
        vehicleType: item.vehicleType.name,
        isAssigned: item.isAssigned === true ? "Yes" : "No",
        isParked: item.isParked === true ? "Yes" : "No",
        fuelConsumed: item.fuelConsumed,
        fuelGiven: item.fuelGiven,
        fuelType: item.fuelType.name,
        isWorkingFine: item.isWorkingFine === true ? "Yes" : "No",
        company: item.companyId.userId.username,
      }));

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="" showDropdown>
        <div className="table-container">
          <Table tableColumns={allVehiclesColumns} tableBody={allVehicles} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AllVehiclesForCompanyOwner() {
  const [allVehicles, setAllVehicles] = useState([]);

  useEffect(() => {
    fetchAllVehicles(`companyId=${getLocalStorageItem("companyId")}`);
  }, []);

  const fetchAllVehicles = async (queryParams) => {
    try {
      const response = await vehicleService.getVehicles(queryParams);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        model: item.model,
        manufacturer: item.manufacturer,
        licensePlateNumber: item.licensePlateNumber,
        chassisNumber: item.chassisNumber,
        vehicleType: item.vehicleType.name,
        isAssigned: item.isAssigned === true ? "Yes" : "No",
        isParked: item.isParked === true ? "Yes" : "No",
        fuelConsumed: item.fuelConsumed,
        fuelGiven: item.fuelGiven,
        fuelType: item.fuelType.name,
        isWorkingFine: item.isWorkingFine === true ? "Yes" : "No",
        company: item.companyId.userId.username,
      }));

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      {/* <DetailsContainer title="All Vehicles:" showDropdown> */}
      <DetailsContainer title="" showDropdown>
        <div className="table-container">
          <Table tableColumns={allVehiclesColumns} tableBody={allVehicles} />
        </div>
      </DetailsContainer>
    </div>
  );
}

export function AddVehicleForCompanyOwner() {
  const [vehicle, setVehicle] = useState({
    companyId: getLocalStorageItem("companyId"),
    manufacturer: "",
    model: "",
    licensePlateNumber: "",
    chassisNumber: "",
    // isParked: false,
    isAssigned: false,
    // isWorkingFine: true,
    vehicleType: "",
    fuelType: "",
    fuelGiven: "",
    fuelConsumed: 0,
  });
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  // const companyId = getLocalStorageItem("companyId");

  useEffect(() => {
    fetchVehicleTypes();
    fetchFuelTypes();
  }, []);

  useEffect(() => {
    if (selectedVehicleType.id) setVehicle((prev) => ({ ...prev, vehicleType: selectedVehicleType.id }));
  }, [selectedVehicleType]);

  useEffect(() => {
    if (selectedFuelType.id) setVehicle((prev) => ({ ...prev, fuelType: selectedFuelType.id }));
  }, [selectedFuelType]);

  const fetchVehicleTypes = async () => {
    try {
      const response = await vehicleTypesService.getVehicleTypes();
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
      }));

      setVehicleTypes(tableBodyData);
    } catch (error) {}
  };

  const fetchFuelTypes = async () => {
    try {
      const response = await fuelTypesService.getFuelTypes();
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
      }));

      setFuelTypes(tableBodyData);
    } catch (error) {}
  };

  //
  const handleChange = (e) => {
    setVehicle((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = vehicleService.vehicleSchema.validate(vehicle);
      if (error) return showFailureToaster(error.message);

      await vehicleService.addVehicle({
        ...vehicle,
      });

      setVehicle({
        companyId: getLocalStorageItem("companyId"),
        manufacturer: "",
        model: "",
        licensePlateNumber: "",
        chassisNumber: "",
        // isParked: false,
        isAssigned: false,
        // isWorkingFine: true,
        vehicleType: "",
        fuelType: "",
        fuelGiven: "",
        fuelConsumed: 0,
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
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input
                name="manufacturer"
                type="text"
                placeholder="Enter manufacturer."
                className="form-control input"
                onChange={handleChange}
                autoComplete="manufacturer"
              />
            </div>

            <div>
              <label htmlFor="model">Model:</label>
              <input
                name="model"
                type="text"
                placeholder="Enter model."
                className="form-control input"
                onChange={handleChange}
                autoComplete
              />
            </div>

            <div>
              <label htmlFor="licensePlateNumber">License Plate Number:</label>
              <input
                name="licensePlateNumber"
                type="text"
                placeholder="Enter licensePlateNumber."
                className="form-control input"
                onChange={handleChange}
                autoComplete="licensePlateNumber"
              />
            </div>

            <div>
              <label htmlFor="chassisNumber">ChassisNumber:</label>
              <input
                name="chassisNumber"
                type="text"
                placeholder="Enter chassisNumber."
                className="form-control input"
                onChange={handleChange}
                autoComplete="chassisNumber"
              />
            </div>

            <div>
              <label htmlFor="fuelGiven">Fuel Given (fuel/ltr to allocate/mth):</label>
              <input
                name="fuelGiven"
                type="text"
                placeholder="Enter fuel (ltr)."
                className="form-control input"
                onChange={handleChange}
                autoComplete="fuelGiven"
              />
            </div>

            <div>
              <label>Vehicle Type:</label>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Vehicle Type."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={vehicleTypes}
                selectedItem={selectedVehicleType}
                setSelectedItem={setSelectedVehicleType}
              ></DropdownSearhable>
            </div>

            <div>
              <label>Fuel Type:</label>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Fuel Type."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={fuelTypes}
                selectedItem={selectedFuelType}
                setSelectedItem={setSelectedFuelType}
              ></DropdownSearhable>
            </div>

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

export function AddVehicleForAdmin() {
  const [vehicle, setVehicle] = useState({
    companyId: "",
    manufacturer: "",
    model: "",
    licensePlateNumber: "",
    chassisNumber: "",
    isParked: false,
    isAssigned: false,
    isWorkingFine: true,
    vehicleType: "",
    fuelType: "",
    fuelGiven: "",
    fuelConsumed: 0,
  });
  const [companies, setCompanies] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fuelTypes, setFuelTypes] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  // const companyId = getLocalStorageItem("companyId");

  useEffect(() => {
    fetchVehicleTypes();
    fetchFuelTypes();
    fetchCompanies();
  }, []);

  useEffect(() => {
    if (selectedCompany.id) setVehicle((prev) => ({ ...prev, companyId: selectedCompany.id }));
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedVehicleType.id) setVehicle((prev) => ({ ...prev, vehicleType: selectedVehicleType.id }));
  }, [selectedVehicleType]);

  useEffect(() => {
    if (selectedFuelType.id) setVehicle((prev) => ({ ...prev, fuelType: selectedFuelType.id }));
  }, [selectedFuelType]);

  const fetchCompanies = async () => {
    try {
      const response = await companyService.getCompanies();
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.userId.username,
      }));

      setCompanies(tableBodyData);
    } catch (error) {}
  };

  const fetchVehicleTypes = async () => {
    try {
      const response = await vehicleTypesService.getVehicleTypes();
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
      }));

      setVehicleTypes(tableBodyData);
    } catch (error) {}
  };

  const fetchFuelTypes = async () => {
    try {
      const response = await fuelTypesService.getFuelTypes();
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
      }));

      setFuelTypes(tableBodyData);
    } catch (error) {}
  };

  //
  const handleChange = (e) => {
    setVehicle((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = vehicleService.vehicleSchema.validate(vehicle);
      if (error) return showFailureToaster(error.message);

      await vehicleService.addVehicle({
        ...vehicle,
      });

      setVehicle({
        companyId: "",
        manufacturer: "",
        model: "",
        licensePlateNumber: "",
        chassisNumber: "",
        isParked: false,
        isAssigned: false,
        isWorkingFine: true,
        vehicleType: "",
        fuelType: "",
        fuelGiven: "",
        fuelConsumed: 0,
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
              <label htmlFor="manufacturer">Manufacturer:</label>
              <input
                name="manufacturer"
                type="text"
                placeholder="Enter manufacturer."
                className="form-control input"
                onChange={handleChange}
                autoComplete="manufacturer"
              />
            </div>

            <div>
              <label htmlFor="model">Model:</label>
              <input
                name="model"
                type="text"
                placeholder="Enter model."
                className="form-control input"
                onChange={handleChange}
                autoComplete
              />
            </div>

            <div>
              <label htmlFor="licensePlateNumber">License Plate Number:</label>
              <input
                name="licensePlateNumber"
                type="text"
                placeholder="Enter licensePlateNumber."
                className="form-control input"
                onChange={handleChange}
                autoComplete="licensePlateNumber"
              />
            </div>

            <div>
              <label htmlFor="chassisNumber">ChassisNumber:</label>
              <input
                name="chassisNumber"
                type="text"
                placeholder="Enter chassisNumber."
                className="form-control input"
                onChange={handleChange}
                autoComplete="chassisNumber"
              />
            </div>

            <div>
              <label htmlFor="fuelGiven">Fuel Given (fuel/ltr to allocate/mth):</label>
              <input
                name="fuelGiven"
                type="text"
                placeholder="Enter fuel (ltr)."
                className="form-control input"
                onChange={handleChange}
                autoComplete="fuelGiven"
              />
            </div>

            <div style={{ margin: "2rem 0" }}>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Company."
                // style={styles.dropDown.smallDropDownWithoutBorder}
                list={companies}
                selectedItem={selectedCompany}
                setSelectedItem={setSelectedCompany}
              ></DropdownSearhable>
            </div>

            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Select Vehicle Type."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={vehicleTypes}
              selectedItem={selectedVehicleType}
              setSelectedItem={setSelectedVehicleType}
            ></DropdownSearhable>

            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Select Fuel Type."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={fuelTypes}
              selectedItem={selectedFuelType}
              setSelectedItem={setSelectedFuelType}
            ></DropdownSearhable>

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

export function AssignVehicleForCompanyOwner() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const companyId = getLocalStorageItem("companyId");

  useEffect(() => {
    fetchAllEmployees(`?companyId=${companyId}&assignedVehicle=false`);
    fetchAllVehicles(`companyId=${companyId}&isAssigned=false`);
  }, []);

  const fetchAllEmployees = async (queryParams = "") => {
    try {
      const response = await employeeService.getEmployees1(queryParams);
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.userId.username,
      }));

      setAllEmployees(tableBodyData);
    } catch (error) {}
  };

  const fetchAllVehicles = async (queryParams = "") => {
    try {
      const response = await vehicleService.getVehicles(queryParams);
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.licensePlateNumber,
      }));

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      let payload = { vehicleId: selectedVehicle.id, employeeId: selectedEmployee.id, assign: true };

      const { error } = employeeService.vehcileAssignSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      await employeeService.assignVehicle(payload);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Enter Info:" showDropdown>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "13rem",
            width: "14.5rem",
          }}
        >
          <DropdownSearhable
            idkey="id"
            displayKey="name"
            placeholder="Select Employee."
            list={allEmployees}
            selectedItem={selectedEmployee}
            setSelectedItem={setSelectedEmployee}
          ></DropdownSearhable>

          <DropdownSearhable
            idkey="id"
            displayKey="name"
            placeholder="Select Vehicle."
            list={allVehicles}
            selectedItem={selectedVehicle}
            setSelectedItem={setSelectedVehicle}
          ></DropdownSearhable>

          <button
            className="btn buttonDarker "
            type="submit"
            style={{ alignSelf: "flex-end" }}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </DetailsContainer>
    </div>
  );
}

// export function UnAssignVehicleForCompanyOwner() {
//   const [allEmployees, setAllEmployees] = useState([]);
//   // const [allVehicles, setAllVehicles] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedVehicle, setSelectedVehicle] = useState("");
//   const companyId = getLocalStorageItem("companyId");

//   useEffect(() => {
//     fetchAllEmployees(`?companyId=${companyId}&assignedVehicle=true`);
//     // fetchAllVehicles(`companyId=${companyId}&isAssigned=false`);
//   }, []);

//   const fetchAllEmployees = async (queryParams = "") => {
//     try {
//       const response = await employeeService.getEmployees1(queryParams);
//       let tableBodyData = response.data.map((item) => ({
//         id: item._id,
//         name: item.userId.username,
//       }));

//       setAllEmployees(tableBodyData);
//     } catch (error) {}
//   };

//   // const fetchAllVehicles = async (queryParams = "") => {
//   //   try {
//   //     const response = await vehicleService.getVehicles(queryParams);
//   //     let tableBodyData = response.data.map((item) => ({
//   //       id: item._id,
//   //       name: item.licensePlateNumber,
//   //     }));

//   //     setAllVehicles(tableBodyData);
//   //   } catch (error) {}
//   // };

//   const handleSubmit = async () => {
//     try {
//       let payload = { vehicleId: "", employeeId: selectedEmployee.id, assign: false };

//       const { error } = employeeService.vehcileAssignSchema.validate(payload);
//       if (error) return showFailureToaster(error.message);

//       await employeeService.assignVehicle(payload);
//     } catch (error) {}
//   };

//   return (
//     <div className="allCompaniesScreen">
//       <DetailsContainer title="Select employee to take vehicle back." showDropdown>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             // minHeight: "13rem",
//             rowGap: "1rem",
//             width: "14.5rem",
//           }}
//         >
//           <DropdownSearhable
//             idkey="id"
//             displayKey="name"
//             placeholder="Select Employee."
//             list={allEmployees}
//             selectedItem={selectedEmployee}
//             setSelectedItem={setSelectedEmployee}
//           ></DropdownSearhable>

//           {/* <DropdownSearhable
//             idkey="id"
//             displayKey="name"
//             placeholder="Select Vehicle."
//             list={allVehicles}
//             selectedItem={selectedVehicle}
//             setSelectedItem={setSelectedVehicle}
//           ></DropdownSearhable> */}

//           <button
//             className="btn buttonDarker "
//             type="submit"
//             style={{ alignSelf: "flex-end" }}
//             onClick={handleSubmit}
//           >
//             UnAssing
//           </button>
//         </div>
//       </DetailsContainer>
//     </div>
//   );
// }

export function AssignVehicleForAdmin() {
  const [allEmployees, setAllEmployees] = useState([]);
  const [allVehicles, setAllVehicles] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchAllEmployees(`?assignedVehicle=false`);
    fetchAllVehicles(`isAssigned=false`);
  }, []);

  const fetchAllEmployees = async (queryParams = "") => {
    try {
      const response = await employeeService.getEmployees1(queryParams);
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.userId.username,
      }));

      setAllEmployees(tableBodyData);
    } catch (error) {}
  };

  const fetchAllVehicles = async (queryParams = "") => {
    try {
      const response = await vehicleService.getVehicles(queryParams);
      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.licensePlateNumber,
      }));

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  const handleSubmit = async () => {
    try {
      let payload = { vehicleId: selectedVehicle.id, employeeId: selectedEmployee.id, assign: true };

      const { error } = employeeService.vehcileAssignSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      await employeeService.assignVehicle(payload);
    } catch (error) {}
  };

  return (
    <div className="allCompaniesScreen">
      <DetailsContainer title="Enter Info:" showDropdown>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "13rem",
            width: "14.5rem",
          }}
        >
          <DropdownSearhable
            idkey="id"
            displayKey="name"
            placeholder="Select Employee."
            list={allEmployees}
            selectedItem={selectedEmployee}
            setSelectedItem={setSelectedEmployee}
          ></DropdownSearhable>

          <DropdownSearhable
            idkey="id"
            displayKey="name"
            placeholder="Select Vehicle."
            list={allVehicles}
            selectedItem={selectedVehicle}
            setSelectedItem={setSelectedVehicle}
          ></DropdownSearhable>

          <button
            className="btn buttonDarker "
            type="submit"
            style={{ alignSelf: "flex-end" }}
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </DetailsContainer>
    </div>
  );
}

export function VehicleDetailsForEmployee() {
  const [vehicleDetails, setvehicleDetails] = useState({});
  const employeeId = getLocalStorageItem("employeeId");

  useEffect(() => {
    fetchEmployeeDetails(employeeId);
  }, []);

  const fetchEmployeeDetails = async (id) => {
    try {
      const employeeDetails = await employeeService.getEmployees1(`?_id=${id}`);
      let response = employeeDetails.data[0];

      let assignedVehicleId = response.assignedVehicleId;
      if (assignedVehicleId) {
        let response = await vehicleService.getVehicles(`_id=${assignedVehicleId}`);
        let data = {
          "Vehicle Type": response.data[0].vehicleType.name,
          Manufacturer: response.data[0].manufacturer,
          Model: response.data[0].model,
          "License Plate Number": response.data[0].licensePlateNumber,
          "Chassis Number": response.data[0].chassisNumber,
          "Is Parked": response.data[0].isParked.toString(),
          "Fuel Given": response.data[0].fuelGiven,
          "Fuel Consumed": response.data[0].fuelConsumed,
          "Fuel Type": response.data[0].fuelType.name,
        };

        setvehicleDetails(data);
      } else {
        setvehicleDetails("");
      }
    } catch (error) {}
  };

  if (vehicleDetails) return <DetailsInfo obj={vehicleDetails} />;

  return <h2>No vehicle assigned to me.</h2>;
}
