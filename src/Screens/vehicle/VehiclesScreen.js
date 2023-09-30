import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { allVehiclesColumns } from "../../constants/data/vehicles";
import { vehicleService } from "../../services/vehicle/vehicleService";

export default function VehiclesScreen() {
  const [allVehicles, setAllVehicles] = useState([]);
  const [searchedVehicle, setSearchedVehicle] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchAllVehicles();
  }, []);

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
      }));

      console.log("vehcileresponetablebodydata ", tableBodyData);

      setAllVehicles(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificVehicle = async (vehicleId) => {
    try {
      const response = await vehicleService.getVehicles(vehicleId);

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
      }));

      setSearchedVehicle(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="Search vehicle by Chassis Number:" showDropdown>
          <div style={{ margin: "2rem 0" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="chassisNumber"
              placeholder="Select Vehicle."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allVehicles}
              selectedItem={selectedVehicle}
              setSelectedItem={setSelectedVehicle}
            ></DropdownSearhable>
          </div>

          <div className="table-container">
            <Table tableColumns={allVehiclesColumns} tableBody={searchedVehicle} />
          </div>
        </DetailsContainer>

        <DetailsContainer title="All Vehicles:" showDropdown>
          <div className="table-container">
            <Table tableColumns={allVehiclesColumns} tableBody={allVehicles} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
