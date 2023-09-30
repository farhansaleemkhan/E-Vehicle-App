import React, { useState, useEffect } from "react";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { parkingAreaService } from "../../services/vehicle/parkingAreaService";
import { parkingAreasColumns } from "../../constants/data/parkings";

export default function ParkingsScreen() {
  const [allParkingLocations, setAllParkingLocations] = useState([]);
  const [searchedParkingLocation, setSearchedParkingLocations] = useState([]);
  const [selectedParkingLocation, setSelectedParkingLocation] = useState("");

  useEffect(() => {
    fetchAllParkingLocations();
  }, []);

  useEffect(() => {
    if (selectedParkingLocation.id) fetchSpecificParkingLocation(selectedParkingLocation.id);
  }, [selectedParkingLocation]);

  const fetchAllParkingLocations = async () => {
    try {
      const response = await parkingAreaService.getParkingAreas();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        bookedSlots: item.bookedSlots,
        location: "VIEW",
        belongsTo: item.belongsTo,
      }));

      setAllParkingLocations(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificParkingLocation = async (vehicleId) => {
    try {
      const response = await parkingAreaService.getParkingAreas(vehicleId);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        bookedSlots: item.bookedSlots,
        location: "VIEW",
        belongsTo: item.belongsTo,
      }));

      setSearchedParkingLocations(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="Search Parking-Area by Name:" showDropdown>
          <div style={{ margin: "2rem 0" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Select Parking-Area."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allParkingLocations}
              selectedItem={selectedParkingLocation}
              setSelectedItem={setSelectedParkingLocation}
            ></DropdownSearhable>
          </div>

          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={searchedParkingLocation} />
          </div>
        </DetailsContainer>

        <DetailsContainer title="All Parking-Areas:" showDropdown>
          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={allParkingLocations} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
