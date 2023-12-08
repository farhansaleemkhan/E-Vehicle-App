import {
  AddParkingAreaForCompanyOwner,
  AllParkingAreasForAdmin,
  AllParkingAreasForCompanyOwner,
  AllParkingAreasForEmployee,
  CurrentParkingsForAdmin,
  CurrentParkingsForCompanyOwner,
  ParkVehicleForAdmin,
  ParkVehicleForCompanyOwner,
  ParkVehicleForEmployee,
  ParkingHistoryForEmployee,
  SearchParkingAreaForAdmin,
  SearchParkingAreaForCompanyOwner,
  SearchParkingAreaForEmployee,
} from "../../Screens/vehicle/ParkingsScreen";

export const parkingAreasColumns = [
  {
    name: "Id",
    value: "Id",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Name",
    value: "Name",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Total Slots",
    value: "Total Slots",
    class: { width: "8rem", minWidth: "8rem" },
  },
  // {
  //   name: "Booked Slots",
  //   value: "Booked Slots",
  //   class: { width: "12rem", minWidth: "12rem" },
  // },
  // {
  //   name: "Location",
  //   value: "Location",
  //   class: { width: "7rem", minWidth: "7rem" },
  // },
  {
    name: "Company",
    value: "Company",
    class: { width: "13rem", minWidth: "13rem" },
  },
];

export const parkingAreasColumnsForParkingBooking = [
  {
    name: "Id",
    value: "Id",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Name",
    value: "Name",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Total Slots",
    value: "Total Slots",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Booked Slots",
    value: "Booked Slots",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Type",
    value: "Type",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Company",
    value: "Company",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Get Slot",
    value: "Get Slot",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Park Here",
    value: "Park Here",
    class: { width: "10rem", minWidth: "10rem" },
  },
];

export const companyParkingAreasColumnsForParkingBooking = [
  {
    name: "Id",
    value: "Id",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Name",
    value: "Name",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Total Slots",
    value: "Total Slots",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Booked Slots",
    value: "Booked Slots",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Type",
    value: "Type",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Company",
    value: "Company",
    class: { width: "12rem", minWidth: "12rem" },
  },
];

export const parkingColumns = [
  // {
  //   name: "Id",
  //   value: "Id",
  //   class: { width: "15rem", minWidth: "15rem" },
  // },

  // {
  //   name: "Manufacturer",
  //   value: "Manufacturer",
  //   class: { width: "7rem", minWidth: "7rem" },
  // },
  // {
  //   name: "Model",
  //   value: "Model",
  //   class: { width: "7rem", minWidth: "7rem" },
  // },
  {
    name: "Parked By",
    value: "Parked By",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "Car Model",
    value: "Car Model",
    class: { width: "12rem", minWidth: "12rem" },
  },
  {
    name: "License Plate No",
    value: "License Plate No",
    class: { width: "14rem", minWidth: "14rem" },
  },
  // {
  //   name: "Chasis No",
  //   value: "Chasis No",
  //   class: { width: "10rem", minWidth: "10rem" },
  // },
  {
    name: "Parking Time",
    value: "parked At (Time)",
    class: { width: "25rem", minWidth: "25rem" },
  },
  {
    name: "Parking Area Name",
    value: "Parking Area Name",
    class: { width: "15rem", minWidth: "15rem" },
  },
  {
    name: "Slot No",
    value: "Slot No",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Status",
    value: "Status",
    class: { width: "10rem", minWidth: "10rem" },
  },
];

export const employeepParkingHistoryColumns = [
  {
    name: "Id",
    value: "Id",
    class: { width: "15rem", minWidth: "15rem" },
  },
  {
    name: "Parked By",
    value: "Parked By",
    class: { width: "11rem", minWidth: "11rem" },
  },
  // {
  //   name: "Car Model",
  //   value: "Car Model",
  //   class: { width: "10rem", minWidth: "10rem" },
  // },
  // {
  //   name: "License Plate No",
  //   value: "License Plate No",
  //   class: { width: "13rem", minWidth: "13rem" },
  // },
  {
    name: "Parking Time",
    value: "parked At (Time)",
    class: { width: "24rem", minWidth: "24rem" },
  },
  {
    name: "Parking Area Name",
    value: "Parking Area Name",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Slot No",
    value: "Slot No",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Status",
    value: "Status",
    class: { width: "8rem", minWidth: "8rem" },
  },
  {
    name: "Delete",
    value: "Delete",
    class: { width: "8rem", minWidth: "8rem" },
  },
];

export const parkingScreenTabsForAdmin = [
  // {
  //   key: "1",
  //   label: <h4>Park Vehicle</h4>,
  //   children: <ParkVehicleForAdmin />,
  // },
  {
    key: "2",
    label: <h4>Booked Parkings</h4>,
    children: <CurrentParkingsForAdmin />,
  },
  // {
  //   key: "3",
  //   label: <h4>Search Parking Area</h4>,
  //   children: <SearchParkingAreaForAdmin />,
  // },
  {
    key: "4",
    label: <h4>All Parking Areas</h4>,
    children: <AllParkingAreasForAdmin />,
  },
];

export const parkingScreenTabsForCompanyOwner = [
  // {
  //   key: "1",
  //   label: <h4>Park Vehicle</h4>,
  //   children: <ParkVehicleForCompanyOwner />,
  // },
  {
    key: "2",
    label: <h4>Booked Parkings</h4>,
    children: <CurrentParkingsForCompanyOwner />,
  },
  // {
  //   key: "3",
  //   label: <h4>Search Parking Area</h4>,
  //   children: <SearchParkingAreaForCompanyOwner />,
  // },
  {
    key: "4",
    label: <h4>All Parking Areas</h4>,
    children: <AllParkingAreasForCompanyOwner />,
  },
  {
    key: "5",
    label: <h4>Add Parking Area</h4>,
    children: <AddParkingAreaForCompanyOwner />,
  },
];

export const parkingScreenTabsForEmployee = [
  {
    key: "1",
    label: <h4>Park Vehicle</h4>,
    children: <ParkVehicleForEmployee />,
  },
  // {
  //   key: "2",
  //   label: <h4>Search Parking Area</h4>,
  //   children: <SearchParkingAreaForEmployee />,
  // },
  // {
  //   key: "3",
  //   label: <h4>All Parking Areas</h4>,
  //   children: <AllParkingAreasForEmployee />,
  // },
  {
    key: "4",
    label: <h4>Parking History</h4>,
    children: <ParkingHistoryForEmployee />,
  },
];
