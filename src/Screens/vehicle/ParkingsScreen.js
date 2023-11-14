import React, { useState, useEffect, useContext } from "react";
import { Tabs } from "antd";
import moment from "moment";

import Table from "../../Components/Table";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { parkingAreaService } from "../../services/vehicle/parkingAreaService";
import { parkingAreasColumns, parkingColumns } from "../../constants/data/parkings";
import { parkingService } from "../../services/vehicle/parkingService";
import { AuthContext } from "../../context/AuthContext";
import ParkVehicle from "../HomeScreen";

const items = [
  {
    key: "1",
    label: <h4>Park Vehicle</h4>,
    children: <ParkVehicle />,
  },
  {
    key: "2",
    label: <h4>Current Parkings</h4>,
    children: <CurrentParkings />,
  },
  {
    key: "3",
    label: <h4>Search Parking Area</h4>,
    children: <SearchParkingArea />,
  },
  {
    key: "4",
    label: <h4>All Parking Areas</h4>,
    children: <AllParkingAreas />,
  },
];

export default function ParkingsScreen() {
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

function CurrentParkings() {
  const [allParkings, setAllParkings] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkings();
  }, []);

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
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="Parked Vehicles" showDropdown>
          <div className="table-container">
            <Table tableColumns={parkingColumns} tableBody={allParkings} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

function SearchParkingArea() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [searchedParkingArea, setSearchedParkingArea] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkingLocations();
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

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
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

        {/* )} */}
      </div>
    </>
  );
}

function AllParkingAreas() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkingLocations();
  }, []);

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

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="All Parking-Areas:" showDropdown>
          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={allParkingAreas} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}
