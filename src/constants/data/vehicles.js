import {
  AddVehicleForAdmin,
  AddVehicleForCompanyOwner,
  AllVehicles,
  AllVehiclesForCompanyOwner,
  SearchVehicle,
} from "../../Screens/vehicle/VehiclesScreen";

export const allVehiclesColumns = [
  {
    name: "Id",
    value: "Id",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Manufacturer",
    value: "Manufacturer",
    class: { width: "7rem", minWidth: "7rem" },
  },
  {
    name: "Model",
    value: "Model",
    class: { width: "7rem", minWidth: "7rem" },
  },
  {
    name: "License Plate No",
    value: "License Plate No",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Chasis No",
    value: "Chasis No",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Vehicle Type",
    value: "Vehicle Type",
    class: { width: "11rem", minWidth: "11rem" },
  },
  {
    name: "is Assigned?",
    value: "is Assigned?",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "is Parked?",
    value: "is Parked?",
    class: { width: "10rem", minWidth: "10rem" },
  },
  {
    name: "Fuel Consumed/ Month (Litre)",
    value: "Fuel Consumed/ Month (Litre)",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Fuel Allcoated/ Month (Litre)",
    value: "Fuel Allcoated/ Month (Litre)",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Fuelt Type",
    value: "Fuelt Type",
    class: { width: "9rem", minWidth: "9rem" },
  },
  {
    name: "is Working Fine?",
    value: "is Working Fine?",
    class: { width: "14rem", minWidth: "14rem" },
  },
  {
    name: "Company",
    value: "Company",
    class: { width: "10rem", minWidth: "10rem" },
  },
];

export const vehicleScreenTabsForAdmin = [
  {
    key: "1",
    label: <h4>Search Vehicle</h4>,
    children: <SearchVehicle />,
  },
  {
    key: "2",
    label: <h4>Add Vehicle</h4>,
    children: <AddVehicleForAdmin />,
  },
  {
    key: "3",
    label: <h4>All Vehicle</h4>,
    children: <AllVehicles />,
  },
];

export const vehicleScreenTabsForCompanyOwner = [
  {
    key: "1",
    label: <h4>Add Vehicle</h4>,
    children: <AddVehicleForCompanyOwner />,
  },
  {
    key: "2",
    label: <h4>All Vehicles</h4>,
    children: <AllVehiclesForCompanyOwner />,
  },
];
