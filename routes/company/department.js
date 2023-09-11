const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Department, validate } = require("../../models/company/department");

router.get("/", async (req, res) => {
  try {
    const departments = await Department.find();
    return res.json(departments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const department = await Department.find({ _id: req.params.id });
    if (!department) {
      return res.status(404).json({ message: "Department not found for given id." });
    }

    return res.json(department);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const department = new Department(req.body);
    const savedDepartment = await department.save();
    return res.json(savedDepartment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedDepartment = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedDepartment)
      return res.status(404).json({ message: "Department not found for given id." });

    return res.json(updatedDepartment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const department = await Department.findByIdAndRemove(req.params.id);
    if (!department) return res.status(404).json({ message: "Department not found for given id." });

    return res.json({ message: "Department deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
