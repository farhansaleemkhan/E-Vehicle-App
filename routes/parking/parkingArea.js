const express = require("express");
const router = express.Router();

const { ParkingArea, validate } = require("../../models/parking/parkingArea");

router.get("/", async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find();
    return res.json(parkingAreas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findById(req.params.id);
    if (!parkingArea) return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json(parkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let isAlreadyExist = await ParkingArea.findOne({ name: req.body.name });
    if (isAlreadyExist)
      return res.status(400).send({ message: "Parking area already available for given name." });

    const parkingArea = new ParkingArea(req.body);
    const savedParkingArea = await parkingArea.save();
    return res.json(savedParkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedParkingArea = await ParkingArea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedParkingArea)
      return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json(updatedParkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findByIdAndRemove(req.params.id);
    if (!parkingArea) return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json({ message: "parking area deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
