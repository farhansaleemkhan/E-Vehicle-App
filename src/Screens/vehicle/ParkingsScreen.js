import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import moment from "moment";
import { Tabs, DatePicker, Space } from "antd";

import { AuthContext } from "../../context/AuthContext";
import DetailsContainer from "../../Components/DetailsContainer";
import DropdownSearhable from "../../Components/DropdownSearchable";
import { getLocalStorageItem } from "../../utils/localStorage";
import Loader from "../../Components/Loader";
import Parking from "../../Components/Parking";
import { parkingAreaService } from "../../services/vehicle/parkingAreaService";
import { parkingService } from "../../services/vehicle/parkingService";
import { showFailureToaster } from "../../utils/toaster";
import Table from "../../Components/Table";
import {
  employeepParkingHistoryColumns,
  parkingAreasColumns,
  parkingAreasColumnsForParkingBooking,
  parkingColumns,
  parkingScreenTabsForAdmin,
  parkingScreenTabsForCompanyOwner,
  parkingScreenTabsForEmployee,
} from "../../constants/data/parkings";
import { companyService } from "../../services/company/companyService";
import { auth } from "../../services/authService";
import { employeeService } from "../../services/company/employeeService";
import TablePill from "../../Components/TablePills";
import Error from "../../Components/Error";
import TableButton from "../../Components/TableButton";
import TableIcon from "../../Components/TableIcon";

const { RangePicker } = DatePicker;

export default function ParkingsScreen() {
  const userType = getLocalStorageItem("userType");

  return (
    <div className="mt-3 ml-3 mr-3">
      {userType === "admin" && (
        <Tabs defaultActiveKey="1" items={parkingScreenTabsForAdmin} onChange={() => {}} />
      )}

      {userType === "company" && (
        <Tabs defaultActiveKey="1" items={parkingScreenTabsForCompanyOwner} onChange={() => {}} />
      )}

      {userType === "employee" && (
        <Tabs defaultActiveKey="1" items={parkingScreenTabsForEmployee} onChange={() => {}} />
      )}
    </div>
  );
}

export function CurrentParkingsForAdmin() {
  const [allParkings, setAllParkings] = useState([]);
  const [selectedParkingStatus, setSelectedParkingStatus] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(false);
  // const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkings();
  }, []);

  useEffect(() => {
    if (selectedParkingStatus.id) fetchAllParkingsWithStatus();
  }, [selectedParkingStatus]);

  useEffect(() => {
    if (isListEmpty === true) setAllParkings([]);
  }, [isListEmpty]);

  const fetchAllParkings = async () => {
    try {
      const response = await parkingService.getParkings();
      console.log("CurrentParkingsForAdmin ", response);

      let tableBodyData = response.data.map((item) => ({
        // id: item._id,
        // manufacturer: item?.employeeId?.assignedVehicleId?.manufacturer,
        // model: item.employeeId?.assignedVehicleId?.model,
        parkedBy: item.employeeId?.userId?.username,
        car: `${item.employeeId?.assignedVehicleId?.manufacturer}   ${item.employeeId?.assignedVehicleId?.model}`,
        licensePlateNumber: item.employeeId?.assignedVehicleId?.licensePlateNumber,
        // chassisNumber: item.employeeId?.assignedVehicleId?.chassisNumber,
        parkedTime:
          moment(item?.startTime).format("YYYY-MM-DD HH:mm:ss") +
          "    -------   " +
          moment(item?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        parkingAreaId: item.parkingAreaId.name,
        status: {
          componentName: TablePill,
          value: item?.endTime < Date.now() ? "Completed" : "Booked",
        },

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
      }));

      setAllParkings(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkingsWithStatus = async () => {
    try {
      const response = await parkingService.getParkings();
      console.log("CurrentParkingsForAdmin ", response);

      let tableBodyData = response.data.map((item) => ({
        // id: item._id,
        // manufacturer: item?.employeeId?.assignedVehicleId?.manufacturer,
        // model: item.employeeId?.assignedVehicleId?.model,
        parkedBy: item.employeeId?.userId?.username,
        car: `${item.employeeId?.assignedVehicleId?.manufacturer}   ${item.employeeId?.assignedVehicleId?.model}`,
        licensePlateNumber: item.employeeId?.assignedVehicleId?.licensePlateNumber,
        // chassisNumber: item.employeeId?.assignedVehicleId?.chassisNumber,
        parkedTime:
          moment(item?.startTime).format("YYYY-MM-DD HH:mm:ss") +
          "    -------   " +
          moment(item?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        parkingAreaId: item.parkingAreaId.name,
        status: {
          componentName: TablePill,
          value: item?.endTime < Date.now() ? "Completed" : "Booked",
        },

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
      }));

      let filteredTableBodyData = tableBodyData.filter((item) => {
        return item.status.value.toUpperCase() == selectedParkingStatus.name.toUpperCase();
      });

      setAllParkings(filteredTableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="" showDropdown>
          <div style={{ margin: "1rem" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Click here to filter by status."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={[
                { id: "1", name: "Booked" },
                { id: "2", name: "Completed" },
              ]}
              selectedItem={selectedParkingStatus}
              setSelectedItem={setSelectedParkingStatus}
              setIsListEmpty={setIsListEmpty}
              isListEmpty={isListEmpty}
            ></DropdownSearhable>
          </div>

          {isListEmpty && <Error message="No Data found" />}

          <div className="table-container">
            <Table tableColumns={parkingColumns} tableBody={allParkings} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

export function SearchParkingAreaForAdmin() {
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
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificParkingLocation = async (vehicleId) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?_id=${vehicleId}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
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

export function AllParkingAreasForAdmin() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const [searchedParkingAreas, setSearchedParkingAreas] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);

  // const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkingLocations();
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) {
      fetchAllParkingsAreasWithName();
    }
  }, [selectedParkingArea]);

  useEffect(() => {
    if (isListEmpty === true) setSearchedParkingAreas([]);
  }, [isListEmpty]);

  const fetchAllParkingLocations = async () => {
    try {
      const response = await parkingAreaService.getParkingAreas();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
      setSearchedParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkingsAreasWithName = async () => {
    try {
      const response = await parkingAreaService.getParkingAreas();

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      let filteredTableBodyData = tableBodyData.filter((item) => {
        return item.name.toUpperCase() == selectedParkingArea.name.toUpperCase();
      });

      setSearchedParkingAreas(filteredTableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="" showDropdown>
          {/* <div style={{ margin: "1rem" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Filter by Name."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allParkingAreas}
              selectedItem={selectedParkingArea}
              setSelectedItem={setSelectedParkingArea}
              setIsListEmpty={setIsListEmpty}
              isListEmpty={isListEmpty}
            ></DropdownSearhable>
          </div>

          {isListEmpty && <Error message="No Data found" />} */}

          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={searchedParkingAreas} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

export function ParkVehicleForAdmin() {
  const [parkings, setParkings] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const [duplicateParking, setDuplicateParking] = useState([]);
  // const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetchAvailableParkings();
  // }, []);

  const fetchAvailableParkings = async () => {
    try {
      let payload = {
        startTime: fromDate,
        endTime: toDate,
      };

      const { error } = parkingService.findParkingsSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      setLoading(true);
      let parkings = await parkingAreaService.getParkingAreas("");
      let currentParkings = await parkingService.findParkings(payload);

      console.log("parkings ", parkings);
      console.log("parkings current", currentParkings);

      parkings = parkings?.data?.map((item) => ({
        ...item,
        bookedSlots: currentParkings[item._id]?.length ? currentParkings[item._id]?.length : 0,
        // bookedSlots: 3,
      }));

      console.log("parkings true ", parkings);

      setParkings(parkings);
      // setDuplicateParking(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  function updateDates(dates) {
    setFromDate(Date.now(dates[0]));
    setToDate(Date.now(dates[1]));
  }

  // function filterBySearch() {
  //   const tempParkings = duplicateParking.filter((parking) =>
  //     parking.name.toLowerCase().includes(searchKey.toLowerCase())
  //   );
  //   setParkings(tempParkings);
  // }

  // function filterByType(e) {
  //   setType(e);
  //   if (e !== "all") {
  //     const tempParkings = duplicateParking.filter(
  //       (parking) => parking.type.toLowerCase() === e.toLowerCase()
  //     );
  //     setParkings(tempParkings);
  //   } else {
  //     setParkings(duplicateParking);
  //   }
  // }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) result.push(i);

    return result;
  };

  const disabledDate = (current) => {
    if (current && current < dayjs().startOf("day")) return true;

    return false;
  };

  const disabledRangeTime = (_, type) => {
    const currentMoment = dayjs();
    const isCurrentDate = currentMoment.isSame(_, "date");

    return {
      disabledHours: () => (isCurrentDate ? range(0, currentMoment.hour()) : []),
      disabledMinutes: () =>
        isCurrentDate && _ && dayjs(_).isSame(currentMoment, "hour")
          ? range(0, currentMoment.minute())
          : [],
      disabledSeconds: () => [],
    };
  };

  return (
    <div className="container">
      <div className="row mt-5 shadow d-flex  align-items-center justify-content-center">
        <div className="col-md-4">
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
                dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
              ],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={updateDates}
          />
        </div>

        {/* <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Parkings"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div> */}

        <div className="col-md-2">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="covered">Covered</option>
            <option value="uncovered">Non-Covered</option>
          </select>
        </div>
        <button
          className="btn buttonDarker "
          type="submit"
          style={{ width: "5rem", fontWeight: "bold" }}
          onClick={fetchAvailableParkings}
        >
          Search
        </button>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          parkings.map((parking) => {
            return (
              <div className="col-md-9 mt-2">
                <Parking parking={parking} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/////////////////////////////
export function CurrentParkingsForCompanyOwner() {
  const [allParkings, setAllParkings] = useState([]);
  const [selectedParkingStatus, setSelectedParkingStatus] = useState([]);
  const [isListEmpty, setIsListEmpty] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id).then((data) => {
      fetchAllParkings(data._id);
    });
  }, []);

  useEffect(() => {
    if (selectedParkingStatus.id) {
      fetchSpecificCompany(currentUser._id).then((data) => {
        fetchAllParkingsWithStatus(data._id);
      });
    }
  }, [selectedParkingStatus]);

  useEffect(() => {
    if (isListEmpty === true) setAllParkings([]);
  }, [isListEmpty]);

  const fetchSpecificCompany = async (id) => {
    try {
      const response = await companyService.getCompanies("", id);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAllParkings = async (id) => {
    try {
      const response = await parkingService.getParkings(`?companyId=${id}`);

      let tableBodyData = response.data.map((item) => ({
        // id: item._id,
        // manufacturer: item?.employeeId?.assignedVehicleId?.manufacturer,
        // model: item.employeeId?.assignedVehicleId?.model,
        parkedBy: item.employeeId?.userId?.username,
        car: `${item.employeeId?.assignedVehicleId?.manufacturer}   ${item.employeeId?.assignedVehicleId?.model}`,
        licensePlateNumber: item.employeeId?.assignedVehicleId?.licensePlateNumber,
        // chassisNumber: item.employeeId?.assignedVehicleId?.chassisNumber,
        parkedTime:
          moment(item?.startTime).format("YYYY-MM-DD HH:mm:ss") +
          "    -------   " +
          moment(item?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        parkingAreaId: item.parkingAreaId.name,
        status: {
          componentName: TablePill,
          value: item?.endTime < Date.now() ? "Completed" : "Booked",
        },

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
      }));

      setAllParkings(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkingsWithStatus = async (id) => {
    try {
      const response = await parkingService.getParkings(`?companyId=${id}`);
      console.log("CurrentParkingsForAdmin ", response);

      let tableBodyData = response.data.map((item) => ({
        // id: item._id,
        // manufacturer: item?.employeeId?.assignedVehicleId?.manufacturer,
        // model: item.employeeId?.assignedVehicleId?.model,
        parkedBy: item.employeeId?.userId?.username,
        car: `${item.employeeId?.assignedVehicleId?.manufacturer}   ${item.employeeId?.assignedVehicleId?.model}`,
        licensePlateNumber: item.employeeId?.assignedVehicleId?.licensePlateNumber,
        // chassisNumber: item.employeeId?.assignedVehicleId?.chassisNumber,
        parkedTime:
          moment(item?.startTime).format("YYYY-MM-DD HH:mm:ss") +
          "    -------   " +
          moment(item?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        parkingAreaId: item.parkingAreaId.name,
        status: {
          componentName: TablePill,
          value: item?.endTime < Date.now() ? "Completed" : "Booked",
        },

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
      }));

      let filteredTableBodyData = tableBodyData.filter((item) => {
        return item.status.value.toUpperCase() == selectedParkingStatus.name.toUpperCase();
      });

      setAllParkings(filteredTableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        {/* <DetailsContainer title="Search by Parking Status." showDropdown> */}
        <DetailsContainer title="" showDropdown>
          <div style={{ margin: "1rem" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Click here to filter by status."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={[
                { id: "1", name: "Booked" },
                { id: "2", name: "Completed" },
              ]}
              selectedItem={selectedParkingStatus}
              setSelectedItem={setSelectedParkingStatus}
              setIsListEmpty={setIsListEmpty}
              isListEmpty={isListEmpty}
            ></DropdownSearhable>
          </div>

          {isListEmpty && <Error message="No Data found" />}

          <div className="table-container">
            <Table tableColumns={parkingColumns} tableBody={allParkings} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

export function SearchParkingAreaForCompanyOwner() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [searchedParkingArea, setSearchedParkingArea] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   fetchAllParkingLocations();
  // }, []);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id).then((data) => {
      fetchAllParkingLocations(data._id);
    });
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) fetchSpecificParkingLocation(selectedParkingArea.id);
  }, [selectedParkingArea]);

  const fetchSpecificCompany = async (id) => {
    try {
      const response = await companyService.getCompanies("", id);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAllParkingLocations = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificParkingLocation = async (vehicleId) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?_id=${vehicleId}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
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

export function AllParkingAreasForCompanyOwner() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const [searchedParkingAreas, setSearchedParkingAreas] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   fetchAllParkingLocations();
  // }, []);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id).then((data) => {
      fetchAllParkingLocations(data._id);
    });
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) {
      fetchSpecificCompany(currentUser._id).then((data) => {
        fetchAllParkingLocationsWithName(data._id);
      });
    }
  }, [selectedParkingArea]);

  useEffect(() => {
    if (isListEmpty === true) setSearchedParkingAreas([]);
  }, [isListEmpty]);

  const fetchSpecificCompany = async (id) => {
    try {
      const response = await companyService.getCompanies("", id);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAllParkingLocations = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
      setSearchedParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkingLocationsWithName = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      let filteredTableBodyData = tableBodyData.filter((item) => {
        return item.name.toUpperCase() == selectedParkingArea.name.toUpperCase();
      });

      // setAllParkingAreas(filteredTableBodyData);
      setSearchedParkingAreas(filteredTableBodyData);

      // setAllParkingAreas(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        {/* {currentUser.type === "admin" && ( */}
        <DetailsContainer title="" showDropdown>
          {/* <div style={{ margin: "2rem 0" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Filter by Name."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allParkingAreas}
              selectedItem={selectedParkingArea}
              setSelectedItem={setSelectedParkingArea}
              setIsListEmpty={setIsListEmpty}
              isListEmpty={isListEmpty}
            ></DropdownSearhable>
          </div>

          {isListEmpty && <Error message="No Data found" />} */}

          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={searchedParkingAreas} />
          </div>
        </DetailsContainer>
        {/* )} */}
      </div>
    </>
  );
}

export function ParkVehicleForCompanyOwner() {
  const [parkings, setParkings] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const [duplicateParking, setDuplicateParking] = useState([]);
  // const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  let currentUser = auth.getCurrentUserDetails();
  const [selectedCompany, setSelectedCompany] = useState([]);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id);
  }, []);

  const fetchSpecificCompany = async (id) => {
    try {
      const response = await companyService.getCompanies("", id);
      setSelectedCompany(response.data[0]);
    } catch (error) {}
  };

  const fetchAvailableParkings = async () => {
    try {
      let payload = {
        startTime: fromDate,
        endTime: toDate,
      };

      const { error } = parkingService.findParkingsSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      setLoading(true);
      let parkings = await parkingAreaService.getParkingAreas(`?belongsTo=${selectedCompany._id}`);
      let currentParkings = await parkingService.findParkings(payload);

      parkings = parkings?.data?.map((item) => ({
        ...item,
        bookedSlots: currentParkings[item._id]?.length ? currentParkings[item._id]?.length : 0,
        // bookedSlots: 3,
      }));

      console.log("parkings true ", parkings);

      setParkings(parkings);
      // setDuplicateParking(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  function updateDates(dates) {
    setFromDate(Date.now(dates[0]));
    setToDate(Date.now(dates[1]));
  }

  // function filterBySearch() {
  //   const tempParkings = duplicateParking.filter((parking) =>
  //     parking.name.toLowerCase().includes(searchKey.toLowerCase())
  //   );
  //   setParkings(tempParkings);
  // }

  // function filterByType(e) {
  //   setType(e);
  //   if (e !== "all") {
  //     const tempParkings = duplicateParking.filter(
  //       (parking) => parking.type.toLowerCase() === e.toLowerCase()
  //     );
  //     setParkings(tempParkings);
  //   } else {
  //     setParkings(duplicateParking);
  //   }
  // }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) result.push(i);

    return result;
  };

  const disabledDate = (current) => {
    if (current && current < dayjs().startOf("day")) return true;

    return false;
  };

  const disabledRangeTime = (_, type) => {
    const currentMoment = dayjs();
    const isCurrentDate = currentMoment.isSame(_, "date");

    return {
      disabledHours: () => (isCurrentDate ? range(0, currentMoment.hour()) : []),
      disabledMinutes: () =>
        isCurrentDate && _ && dayjs(_).isSame(currentMoment, "hour")
          ? range(0, currentMoment.minute())
          : [],
      disabledSeconds: () => [],
    };
  };

  return (
    <div className="container">
      <div className="row mt-5 shadow d-flex  align-items-center justify-content-center">
        <div className="col-md-4">
          <RangePicker
            disabledDate={disabledDate}
            disabledTime={disabledRangeTime}
            showTime={{
              hideDisabledOptions: true,
              defaultValue: [
                dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
                dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
              ],
            }}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={updateDates}
          />
        </div>

        {/* <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search Parkings"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div> */}

        <div className="col-md-2">
          <select
            className="form-control"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="covered">Covered</option>
            <option value="uncovered">Non-Covered</option>
          </select>
        </div>
        <button
          className="btn buttonDarker "
          type="submit"
          style={{ width: "5rem", fontWeight: "bold" }}
          onClick={fetchAvailableParkings}
        >
          Search
        </button>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          parkings.map((parking) => {
            return (
              <div className="col-md-9 mt-2">
                <Parking parking={parking} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

/////////////

export function SearchParkingAreaForEmployee() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [searchedParkingArea, setSearchedParkingArea] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const currentUser = auth.getCurrentUserDetails();

  // useEffect(() => {
  //   fetchAllParkingLocations();
  // }, []);

  useEffect(() => {
    fetchSpecificUser(currentUser?._id).then((data) => {
      fetchAllParkingLocations(data?.companyId._id);
    });
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) fetchSpecificParkingLocation(selectedParkingArea.id);
  }, [selectedParkingArea]);

  const fetchSpecificUser = async (id) => {
    try {
      const response = await employeeService.getEmployees1(`?userId=${id}`);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAllParkingLocations = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchSpecificParkingLocation = async (vehicleId) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?_id=${vehicleId}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
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

export function AllParkingAreasForEmployee() {
  const [allParkingAreas, setAllParkingAreas] = useState([]);
  const [selectedParkingArea, setSelectedParkingArea] = useState("");
  const [searchedParkingAreas, setSearchedParkingAreas] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchSpecificUser(currentUser?._id).then((data) => {
      fetchAllParkingLocations(data?.companyId._id);
    });
  }, []);

  useEffect(() => {
    if (selectedParkingArea.id) {
      fetchSpecificUser(currentUser._id).then((data) => {
        fetchAllParkingLocationsWithName(data?.companyId._id);
      });
    }
  }, [selectedParkingArea]);

  useEffect(() => {
    if (isListEmpty === true) setSearchedParkingAreas([]);
  }, [isListEmpty]);

  const fetchSpecificUser = async (id) => {
    try {
      const response = await employeeService.getEmployees1(`?userId=${id}`);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAllParkingLocations = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      setAllParkingAreas(tableBodyData);
      setSearchedParkingAreas(tableBodyData);
    } catch (error) {}
  };

  const fetchAllParkingLocationsWithName = async (id) => {
    try {
      const response = await parkingAreaService.getParkingAreas(`?belongsTo=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        name: item.name,
        totalSlots: item.totalSlots,
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
        belongsTo: item.belongsTo.userId.username,
      }));

      let filteredTableBodyData = tableBodyData.filter((item) => {
        return item.name.toUpperCase() == selectedParkingArea.name.toUpperCase();
      });

      // setAllParkingAreas(filteredTableBodyData);
      setSearchedParkingAreas(filteredTableBodyData);

      // setAllParkingAreas(tableBodyData);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="" showDropdown>
          {/* <div style={{ margin: "2rem 0" }}>
            <DropdownSearhable
              idkey="id"
              displayKey="name"
              placeholder="Filter by Name."
              // style={styles.dropDown.smallDropDownWithoutBorder}
              list={allParkingAreas}
              selectedItem={selectedParkingArea}
              setSelectedItem={setSelectedParkingArea}
              setIsListEmpty={setIsListEmpty}
              isListEmpty={isListEmpty}
            ></DropdownSearhable>
          </div>

          {isListEmpty && <Error message="No Data found" />} */}

          <div className="table-container">
            <Table tableColumns={parkingAreasColumns} tableBody={searchedParkingAreas} />
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}

export function ParkVehicleForEmployee() {
  const [currentuserDetails, setCurrentUserDetails] = useState("");
  const [parkings, setParkings] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const [duplicateParking, setDuplicateParking] = useState([]);
  // const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  let currentUser = auth.getCurrentUserDetails();
  const [selectedCompany, setSelectedCompany] = useState([]);

  useEffect(() => {
    fetchSpecificUser(currentUser._id).then((data) => {
      setCurrentUserDetails(data);
      setSelectedCompany(data.companyId._id);
    });
  }, []);

  // const fetchSpecificCompany = async (id) => {
  //   try {
  //     const response = await companyService.getCompanies("", id);
  //     setSelectedCompany(response.data[0]);
  //   } catch (error) {}
  // };

  const fetchSpecificUser = async (id) => {
    try {
      const response = await employeeService.getEmployees1(`?userId=${id}`);
      return response.data[0];
    } catch (error) {}
  };

  const fetchAvailableParkings = async () => {
    try {
      let payload = {
        startTime: fromDate * 1000,
        endTime: toDate * 1000,
      };

      const { error } = parkingService.findParkingsSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      setLoading(true);
      let queryParams = `?belongsTo=${selectedCompany}`;
      if (type) queryParams += `&type=${type}`;

      let parkings = await parkingAreaService.getParkingAreas(queryParams);
      let currentParkings = await parkingService.findParkings(payload);

      parkings = parkings?.data?.map((item) => ({
        // ...item,
        id: item._id,
        Name: item.name,
        "Total Slots": item.totalSlots,
        bookedSlots: currentParkings[item._id]?.length ? currentParkings[item._id]?.length : 0,
        type: item.type,
        company: item.belongsTo.userId.username,
        park: {
          componentName: TableButton,
          value: {
            placeholder: "Book Parking",
            clickable:
              currentuserDetails?.userId?.type === "employee" &&
              currentuserDetails?.assignedVehicle === "true",
          },
          handler: submitParkVehicle,
        },
      }));

      setParkings(parkings);
      // setDuplicateParking(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  async function submitParkVehicle(rowData) {
    let payload = {
      employeeId: currentuserDetails._id,
      parkingAreaId: rowData.id,
      startTime: fromDate * 1000,
      endTime: toDate * 1000,
    };

    const { error } = parkingService.addParkingSchema.validate(payload);
    if (error) return showFailureToaster(error.message);

    try {
      await parkingService.addParking(payload);
      setToDate("");
      setFromDate("");
      fetchAvailableParkings();
    } catch (error) {}
  }

  function updateDates(dates) {
    console.log("datess ", dates);
    const [startDate, endDate] = dates;

    // Convert to Unix timestamp in seconds
    const startUnixTimestamp = dayjs(startDate).unix();
    const endUnixTimestamp = dayjs(endDate).unix();

    console.log("datess ", dayjs(startDate).unix(), "=== ", dayjs(endDate).unix());

    // if (startUnixTimestamp <= endUnixTimestamp) {
    setFromDate(startUnixTimestamp);
    setToDate(endUnixTimestamp);
    // } else {
    //   setFromDate(endUnixTimestamp);
    //   setToDate(startUnixTimestamp);
    // }
  }

  const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) result.push(i);

    return result;
  };

  const disabledDate = (current) => {
    if (current && current < dayjs().startOf("day")) return true;

    return false;
  };

  const disabledRangeTime = (_, type) => {
    const currentMoment = dayjs();
    const isCurrentDate = currentMoment.isSame(_, "date");

    return {
      disabledHours: () => (isCurrentDate ? range(0, currentMoment.hour()) : []),
      disabledMinutes: () =>
        isCurrentDate && _ && dayjs(_).isSame(currentMoment, "hour")
          ? range(0, currentMoment.minute())
          : [],
      disabledSeconds: () => [],
    };
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-5 shadow d-flex  align-items-center justify-content-center">
          <div className="col-md-4">
            <RangePicker
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
                  dayjs(dayjs().format("HH:mm:ss"), "HH:mm:ss"),
                ],
              }}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={updateDates}
            />
          </div>

          <div className="col-md-2">
            <select
              className="form-control"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="covered">Covered</option>
              <option value="uncovered">Uncovered</option>
            </select>
          </div>
          <button
            className="btn buttonDarker "
            type="submit"
            style={{ width: "5rem", fontWeight: "bold" }}
            onClick={fetchAvailableParkings}
          >
            Search
          </button>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          <div className="table-container">
            {parkings.length > 0 && (
              <Table tableColumns={parkingAreasColumnsForParkingBooking} tableBody={parkings} />
            )}
          </div>
          // parkings.map((parking) => {
          //   return (
          //     <div className="col-md-9 mt-2">
          //       <Parking parking={parking} fromDate={fromDate} toDate={toDate} />
          //     </div>
          //   );
          // })
        )}
      </div>
    </div>
  );
}

export function AddParkingAreaForCompanyOwner() {
  const [parkingArea, setParkingArea] = useState({
    name: "",
    totalSlots: 0,
    type: "",
    belongsTo: getLocalStorageItem("companyId"),
  });
  const [selectedParkingType, setSelectedParkingType] = useState("");
  const [isListEmpty, setIsListEmpty] = useState(false);

  useEffect(() => {
    if (selectedParkingType.id) setParkingArea((prev) => ({ ...prev, type: selectedParkingType.name }));
  }, [selectedParkingType]);

  //
  const handleChange = (e) => {
    setParkingArea((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const { error } = parkingAreaService.parkingAreaSchema.validate(parkingArea);
      if (error) return showFailureToaster(error.message);

      await parkingAreaService.addParkingArea({
        ...parkingArea,
      });

      setParkingArea({
        name: "",
        totalSlots: 0,
        type: "",
        belongsTo: getLocalStorageItem("companyId"),
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
              columnGap: "10rem",
              rowGap: "1rem",
            }}
          >
            <div>
              <label htmlFor="name">Name:</label>
              <input
                name="name"
                type="text"
                placeholder="Enter name."
                className="form-control input"
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="totalSlots">Total Slots:</label>
              <input
                name="totalSlots"
                type="number"
                placeholder="Enter total slots."
                className="form-control input"
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Parking Type:</label>
              <DropdownSearhable
                idkey="id"
                displayKey="name"
                placeholder="Select Parking Type."
                list={[
                  { id: "1", name: "covered" },
                  { id: "2", name: "uncovered" },
                ]}
                selectedItem={selectedParkingType}
                setSelectedItem={setSelectedParkingType}
                setIsListEmpty={setIsListEmpty}
                isListEmpty={isListEmpty}
              ></DropdownSearhable>
            </div>

            {/* {isListEmpty && <Error message="No Data found" />} */}

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

export function ParkingHistoryForEmployee() {
  const [allParkings, setAllParkings] = useState([]);
  const employeeId = getLocalStorageItem("employeeId");

  useEffect(() => {
    fetchAllParkings(employeeId);
  }, []);

  const fetchAllParkings = async (id) => {
    try {
      const response = await parkingService.getParkings(`?employeeId=${id}`);

      let tableBodyData = response.data.map((item) => ({
        id: item._id,
        parkedBy: item.employeeId?.userId?.username,
        // car: `${item.employeeId?.assignedVehicleId?.manufacturer}   ${item.employeeId?.assignedVehicleId?.model}`,
        // licensePlateNumber: item.employeeId?.assignedVehicleId?.licensePlateNumber,
        parkedTime:
          moment(item?.startTime).format("YYYY-MM-DD HH:mm:ss") +
          "    -------   " +
          moment(item?.endTime).format("YYYY-MM-DD HH:mm:ss"),
        parkingAreaId: item.parkingAreaId.name,
        status: {
          componentName: TablePill,
          value: item?.endTime < Date.now() ? "Completed" : "Booked",
        },
        delete: {
          componentName: TableIcon,
          value: {
            id: "",
            url: "delete.svg",
          },
          handler: (data) => {
            submitDeletParking(data.id);
            fetchAllParkings(employeeId);
          },
        },
      }));

      setAllParkings(tableBodyData);
    } catch (error) {}
  };

  const submitDeletParking = async (id) => {
    try {
      await parkingService.deleteParking(id);
    } catch (error) {}
  };

  return (
    <>
      <div className="allCompaniesScreen">
        <DetailsContainer title="" showDropdown>
          <div className="table-container">
            {allParkings.length > 0 ? (
              <Table tableColumns={employeepParkingHistoryColumns} tableBody={allParkings} />
            ) : (
              <h3>{`No history available. (You have not parked car yet.)`}</h3>
            )}
          </div>
        </DetailsContainer>
      </div>
    </>
  );
}
