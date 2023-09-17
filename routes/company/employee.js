const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Employee, validate } = require("../../models/company/employee");
const { createUser } = require("../users");

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

    // this will create User first, and then user._id will be added to employee document
    let user = await createUser(req, res);

    const employee = new Employee({ ...req.body, userId: user._id });
    const savedEmployee = await employee.save();

    // TODO: create route for assigning vehicle to employee
    // assign only if that vehicle is not already assigned to some other employee
    // when assigned set the vehcile property isAssigned to true
    // we can use that router handler separately or here as well
    // if assignedVehicle is present in req.body, then assign otherwise don't assign it when creating an employee.
    // router.post("/assignVehicle", .......)

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

router.delete("/:id", async (req, res) => {
  try {
    // TODO: before deleting set the isAssigned property of vehicle to false if assignedVehicle is present or vehicle is assigned
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found for given id." });

    return res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
