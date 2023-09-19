const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { createUser } = require("../users");
const { Employee, validate, validateAssignVehicle } = require("../../models/company/employee");
const { Vehicle } = require("../../models/vehicle/vehicle");

router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    return res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.find({ _id: req.params.id });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found for given id." });
    }

    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    // if vehicleId is present in req.body and vehicle is not already assigned, then assign otherwise don't assign it when creating an employee.
    if (req.body.assignedVehicleId) {
      const vehicle = await Vehicle.findById(req.body.assignedVehicleId);
      if (!vehicle) return res.status(404).json({ message: "Vehicle not found for given id." });
      if (vehicle.isAssigned === true)
        return res.status(409).json({ message: "Vehicle already assigned." });

      vehicle.isAssigned = true;
      await vehicle.save();
    }

    // this will create User first, and then user._id will be added to employee document
    let user = await createUser(req, res);

    const employee = new Employee({ ...req.body, userId: user._id });
    const savedEmployee = await employee.save();

    const token = user.generateAuthToken();
    let data = {
      ..._.pick(user, ["", "name", "email"]),
      ..._.pick(savedEmployee, ["_id", "companyId", "departmentId", "assignedVehicleId", "userId"]),
    };

    return res.header("x-auth-token", token).json({ data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedEmployee) return res.status(404).json({ message: "Employee not found for given id." });

    return res.json(updatedEmployee);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/assign-vehicle/:employeeId", async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { vehicleId, assign } = req.body;

    const { error } = validateAssignVehicle({ employeeId, vehicleId, assign });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: "Employee not found for given id." });

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found for given id" });

    if (assign === true) {
      if (vehicle.isAssigned === true)
        return res.status(409).json({ message: "Vehicle already assigned." });

      employee.assignedVehicleId = vehicleId;
      await employee.save();

      vehicle.isAssigned = assign;
      await vehicle.save();

      return res.status(200).json({ message: "Successfully assigned vehicle to employee" });
    } else if (assign === false) {
      if (vehicle.isAssigned === false)
        return res.status(409).json({ message: "Vehicle is not assigned already." });

      employee.assignedVehicleId = null;
      await employee.save();

      vehicle.isAssigned = false;
      await vehicle.save();

      return res.status(200).json({ message: "Successfully un-assigned vehicle to employee" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // before deleting set the isAssigned property of vehicle to false if vehicle is assigned to employee that is being deleted
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found for given id." });

    if (employee.assignedVehicleId) {
      const vehicle = await Vehicle.findById(employee.assignedVehicleId);
      if (!vehicle)
        return res
          .status(404)
          .json({ message: "Vehicle not found for vehicle id assigned to employee." });

      if (vehicle.isAssigned === true) {
        vehicle.isAssigned = false;
        await vehicle.save();
      }
    }

    return res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
