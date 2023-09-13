const express = require("express");
const router = express.Router();

const { VehicleType, validate } = require("../../models/vehicle/vehicleType");

router.get("/", async (req, res) => {
  try {
    const vehicleTypes = await VehicleType.find();
    return res.json(vehicleTypes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicleType = await VehicleType.findById(req.params.id);
    if (!vehicleType) return res.status(404).json({ message: "Vehicle type not found for given id." });

    return res.json(vehicleType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let isAlreadyExist = await VehicleType.findOne({ name: req.body.name });
    if (isAlreadyExist)
      return res.status(400).send({ message: "Vehicle type already available for given name." });

    const vehicleType = new VehicleType(req.body);
    const savedVehicleType = await vehicleType.save();
    return res.json(savedVehicleType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedVehicleType = await VehicleType.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedVehicleType)
      return res.status(404).json({ message: "Vehicle type not found for given id." });

    return res.json(updatedVehicleType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const vehicleType = await VehicleType.findByIdAndRemove(req.params.id);
    if (!vehicleType) return res.status(404).json({ message: "Vehicle type not found for given id." });

    return res.json({ message: "Vehicle type deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
