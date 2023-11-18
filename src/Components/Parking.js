import React, { useEffect, useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../services/authService";
import { employeeService } from "../services/company/employeeService";
import { parkingService } from "../services/vehicle/parkingService";
import { showFailureToaster } from "../utils/toaster";

const Parking = ({ parking, fromDate, toDate }) => {
  const [currentuserDetails, setCurrentUserDetails] = useState("");
  const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const currentUser = auth.getCurrentUserDetails();

  useEffect(() => {
    fetchSpecificUser(currentUser._id).then((data) => {
      setCurrentUserDetails(data);
    });
  }, []);

  const fetchSpecificUser = async (id) => {
    try {
      const response = await employeeService.getEmployees1(`?userId=${id}`);
      return response.data[0];
    } catch (error) {}
  };

  async function submitParkVehicle() {
    let payload = {
      employeeId: currentuserDetails._id,
      parkingAreaId: parking._id,
      startTime: toDate * 1000,
      endTime: fromDate * 1000,
    };

    const { error } = parkingService.addParkingSchema.validate(payload);
    if (error) return showFailureToaster(error.message);

    try {
      await parkingService.addParking(payload);
    } catch (error) {}
  }

  return (
    <div className="row shadow">
      <div className="col-md-4">
        {/* <img src={parking.image[0]} alt="room" className="smallimg" /> */}
      </div>
      <div className="col-md-7">
        <h1>{parking.name}</h1>
        <b>
          {/* <p>Rent Per Day: {parking.rentperday}</p>
          <p>Max Count: {parking.maxcount}</p>
          <p>Phone Number: {parking.phonenumber}</p> */}
          <p>Company: {parking?.belongsTo?.userId?.username}</p>
          <p>Name: {parking?.name}</p>
          <p>Total Slots: {parking?.totalSlots}</p>
          <p>Booked Slots: {parking?.bookedSlots}</p>
          <p>Type: {parking.type}</p>
        </b>
        <div style={{ float: "right" }}>
          {/* {fromDate && toDate && ( */}
          {currentuserDetails?.userId?.type === "employee" &&
            currentuserDetails?.assignedVehicle === "true" && (
              // <Link to={`/book/${parking._id}/${fromDate}/${toDate}`}>
              <button className="btn btn-primary m-2" onClick={submitParkVehicle}>
                Park here
              </button>
              // </Link>
            )}{" "}
          {/* )} */}
          {/* <button className="btn btn-dark" onClick={handleShow}>
            View Details
          </button> */}
        </div>
      </div>
      {/* <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{parking.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {parking.image.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="First slide" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{parking.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
};

export default Parking;
