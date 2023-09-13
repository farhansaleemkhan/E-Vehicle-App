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

// this will be used to create User first, and then this userId will be assigned to employee automatically
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let { _id } = await createUser(req, res);
    const employee = new Employee({ ...req.body, userId: _id });
    const savedEmployee = await employee.save();
    return res.json(savedEmployee);
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
    const employee = await Employee.findByIdAndRemove(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found for given id." });

    return res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
