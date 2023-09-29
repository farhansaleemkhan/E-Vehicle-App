import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../Components/Loader";
import swal from "sweetalert2";

const onChange = (key) => {
  console.log(key);
};

const items = [
  {
    key: "1",
    label: <h4>Booking</h4>,
    children: (
      <>
        <Booking />,
        <Booking />,
        <Booking />,
        <Booking />,
      </>
    ),
  },
  {
    key: "2",
    label: <h4>Vehicles</h4>,
    children: <Vehicles />,
  },
  {
    key: "3",
    label: <h4>Add Vehicles</h4>,
    children: <AddVehicles />,
  },
  {
    key: "4",
    label: <h4>User</h4>,
    children: <User />,
  },
];

const CompanyAdminScreen = () => {
  // useEffect(()=>{
  //     if(JSON.parse(localStorage.getItem("currentUser")).isAdmin){
  //         window.location.href='/'
  //     }
  // },[])

  return (
    <div className="mt-3 ml-3 mr-3 ">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default CompanyAdminScreen;

//Booking List Component

export function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data=await (await axios.post('/api/bookings/getallbookings')).data
        // setBookings(data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-10">
        <h1>Booking</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="shadow">
            <tr>
              <th>Booking Date</th>
              <th>User ID</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Room List Component

export function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data=await (await axios.post('/api/vehicles/getallcehicles')).data
        // setVehicles(data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        {/* <h1>Room</h1> */}
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="shadow">
            <tr>
              <th>Vehicle ID</th>
              <th>Company</th>
              <th>Model</th>
              <th>Registration No</th>
              <th>Fuel Type</th>
              <th>Engine No</th>
              <th>Chassis No</th>
              <th>Colour</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.length &&
              vehicles.map((vehicle) => {
                return (
                  <tr>
                    <td>{vehicle._id}</td>
                    <td>{vehicle.companyname}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.registrationNo}</td>
                    <td>{vehicle.fuelType}</td>
                    <td>{vehicle.engineNo}</td>
                    <td>{vehicle.chassisNo}</td>
                    <td>{vehicle.colour}</td>
                    <td>{vehicle.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

//Add Room Component

export function AddVehicles() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [vehicleCompany, setVehicleCompany] = useState();
  const [vehicleModel, setVehicleModel] = useState();
  const [vehicleRegNo, setVehicleRegNo] = useState();
  const [vehicleFuel, setVehicleFuel] = useState();
  const [vehicleEngNo, setvehicleEngNo] = useState();
  const [vehChassisNo, setVehChassisNo] = useState();
  const [vehicleColour, setVehicleColour] = useState();
  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  //   function handleImages() {
  //     const fileInput1 = document.getElementById("image1");
  //     const fileInput2 = document.getElementById("image2");
  //     const fileInput3 = document.getElementById("image3");

  //     const selectedImage1 = fileInput1.files[0];
  //     const selectedImage2 = fileInput2.files[0];
  //     const selectedImage3 = fileInput3.files[0];

  //   }

  async function addVehicle() {
    const newvehicle = {
      vehicleCompany,
      vehicleModel,
      vehicleRegNo,
      vehicleFuel,
      vehicleEngNo,
      vehChassisNo,
      vehicleColour,
      imageElement: [image1, image2, image3],
    };
    try {
      setLoading(true);
      // const  result = await (await axios.post('/api/vehicles/addvehicles', newvehicle)).data
      setLoading(false);
      swal.fire("Congrulation", "New Room Added Successfully", "success").then((result) => {
        // window.location.href='/';
      });
    } catch (error) {
      setLoading(false);
      swal.fire("Oops", "Something went Wrong", "error");
    }
  }

  return (
    <div className="row">
      {loading && <Loader />}
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Company Name"
          onChange={(e) => {
            setVehicleCompany(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Model"
          onChange={(e) => {
            setVehicleModel(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Registration Number"
          onChange={(e) => {
            setVehicleRegNo(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Fuel Type"
          onChange={(e) => {
            setVehicleFuel(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Engine No"
          onChange={(e) => {
            setvehicleEngNo(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Chassis Number"
          onChange={(e) => {
            setVehChassisNo(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Vehicle Colour"
          onChange={(e) => {
            setVehicleColour(e.target.value);
          }}
        />

        <label for="image1">Vehicle Front Image :&nbsp;</label>
        <input
          type="file"
          id="image1"
          name="image1"
          accept="image/*"
          onChange={(e) => {
            setImage1(e.target.value);
          }}
          required
        />
        <br />

        <label for="image2">Vehicle Side Image :&nbsp;</label>
        <input
          type="file"
          id="image2"
          name="image2"
          accept="image/*"
          onChange={(e) => {
            setImage2(e.target.value);
          }}
          required
        />
        <br />

        <label for="image3">Vehicle Back Image :&nbsp;</label>
        <input
          type="file"
          id="image3"
          name="image3"
          accept="image/*"
          onChange={(e) => {
            setImage3(e.target.value);
          }}
          required
        />
        <br />

        <div className="text-right">
          <br />
          <button className="btn btn-success" onClick={addVehicle}>
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
}

//User List Component

export function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data=await (await axios.post('/api/users/getallusers')).data
        // setUsers(data)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <th>{user.id}</th>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    <th>{user.isAdmin ? "Yes" : "No"}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
