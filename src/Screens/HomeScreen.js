import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import Parking from "../Components/Parking";
import Loader from "../Components/Loader";
import { parkingService } from "../services/vehicle/parkingService";
import { parkingAreaService } from "../services/vehicle/parkingAreaService";
import { showFailureToaster } from "../utils/toaster";

const { RangePicker } = DatePicker;

const ParkVehicle = () => {
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
};

export default ParkVehicle;
