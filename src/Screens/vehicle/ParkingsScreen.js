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
  parkingAreasColumns,
  parkingColumns,
  parkingScreenTabsForAdmin,
  parkingScreenTabsForCompanyOwner,
  parkingScreenTabsForEmployee,
} from "../../constants/data/parkings";
import { companyService } from "../../services/company/companyService";
import { auth } from "../../services/authService";
import { employeeService } from "../../services/company/employeeService";

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
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchAllParkings();
  }, []);

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

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
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
        // bookedSlots: item.bookedSlots,
        // location: "VIEW",
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

export function ParkVehicleForAdmin() {
  const [parkings, setParkings] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  // const [duplicateParking, setDuplicateParking] = useState([]);
  // const [searchKey, setSearchKey] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetchAvailableParkings();
  }, []);

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
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id).then((data) => {
      fetchAllParkings(data._id);
    });
  }, []);

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

        // manufacturer: item.vehicleId.manufacturer,
        // model: item.vehicleId.model,
        // licensePlateNumber: item.vehicleId.licensePlateNumber,
        // chassisNumber: item.vehicleId.chassisNumber,
        // parkedTime: moment(+item.parkedTime).format("YYYY-MM-DD HH:mm:ss"),
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
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   fetchAllParkingLocations();
  // }, []);

  useEffect(() => {
    fetchSpecificCompany(currentUser._id).then((data) => {
      fetchAllParkingLocations(data._id);
    });
  }, []);

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
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   fetchAllParkingLocations();
  // }, []);

  useEffect(() => {
    fetchSpecificUser(currentUser?._id).then((data) => {
      fetchAllParkingLocations(data?.companyId._id);
    });
  }, []);

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

export function ParkVehicleForEmployee() {
  const [currentuserDetails, setCurrentUserDetails] = useState("");
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
    fetchSpecificUser(currentUser._id).then((data) => {
      console.log("dataaa ", data);
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

      console.log("fromdate ", payload);

      const { error } = parkingService.findParkingsSchema.validate(payload);
      if (error) return showFailureToaster(error.message);

      setLoading(true);
      let parkings = await parkingAreaService.getParkingAreas(`?belongsTo=${selectedCompany}`);
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
    // setFromDate(Date.now(dates[0].$d));
    // setToDate(Date.now(dates[1].$d));

    // setFromDate(dayjs(dates[0].$d).unix());
    // setToDate(dayjs(dates[1].$d).unix());

    // console.log("fromdate dates", dates);
    // console.log("fromdate dates $", dates[0].$d);
    // console.log("fromdate dates ", dates);

    const [startDate, endDate] = dates;

    // Convert to Unix timestamp in seconds
    const startUnixTimestamp = dayjs(startDate).unix();
    const endUnixTimestamp = dayjs(endDate).unix();

    console.log("1111Start Unix Timestamp:", startUnixTimestamp);
    console.log("1111End Unix Timestamp:", endUnixTimestamp);

    setFromDate(startUnixTimestamp);
    setToDate(endUnixTimestamp);
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
