import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { parkingAreaService } from "../../services/vehicle/parkingAreaService";
import { parkingAreasColumns, parkingColumns } from "../../constants/data/parkings";
import { parkingService } from "../../services/vehicle/parkingService";
import { AuthContext } from "../../context/AuthContext";

export default function ParkingsScreen() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [allParkings, setAllParkings] = useState([]);
  const [searchedParkingArea, setSearchedParkingArea] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkingLocations();
    fetchAllParkings();
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) fetchSpecificParkingLocation(selectedParkingArea.id);
  }, [selectedParkingArea]);

  const fetchAllParkingLocations = async () => {
    try {
      const response = await parkingAreaService.getParkingAreas();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        bookedSlots: item.bookedSlots,
        location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
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
        belongsTo: item.belongsTo.userId.username,
      }));

      setSearchedParkingArea(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkings = async () => {
    try {
      const response = await parkingService.getParkings();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        parkingAreaId: item.parkingAreaId.name,
        manufacturer: item.vehicleId.manufacturer,
        model: item.vehicleId.model,
        licensePlateNumber: item.vehicleId.licensePlateNumber,
        chassisNumber: item.vehicleId.chassisNumber,
        parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
      }));

      setAllParkings(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {currentUser.type === "admin" && (
          <>
            <DetailsContainer title="Search Parking-Area by Name:" showDropdown>
              <div style={{ margin: "2rem 0" }}>
                <DropdownSearhable
                  idkey="id"
                  displayKey="name"
                  placeholder="Select Parking-Area."
                  // style={styles.dropDown.smallDropDownWithoutBorder}
                  list={allParkingAreas}
                  selectedItem={selectedParkingArea}
                  setSelectedItem={setSelectedParkingArea}
                ></DropdownSearhable>
              </div>

              <div className="table-container">
                <Table tableColumns={parkingAreasColumns} tableBody={searchedParkingArea} />
              </div>
            </DetailsContainer>

            <DetailsContainer title="All Parking-Areas:" showDropdown>
              <div className="table-container">
                <Table tableColumns={parkingAreasColumns} tableBody={allParkingAreas} />
              </div>
            </DetailsContainer>

            <DetailsContainer title="All Parkings (Vehicles Parked):" showDropdown>
              <div className="table-container">
                <Table tableColumns={parkingColumns} tableBody={allParkings} />
              </div>
            </DetailsContainer>
          </>
        )}
      </div>
    </>
  );
}
