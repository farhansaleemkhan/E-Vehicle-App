const express = require("express");
const router = express.Router();

const { Parking, validate } = require("../../models/parking/parking");
const { ParkingArea } = require("../../models/parking/parkingArea");
const { Vehicle } = require("../../models/vehicle/vehicle");

router.get("/", async (req, res) => {
  try {
    const parkings = await Parking.find();
    return res.json(parkings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parking = await Parking.find({ _id: req.params.id });
    if (!parking) {
      return res.status(404).json({ message: "Parking not found for given id." });
    }

    return res.json(parking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found for given id." });
    if (vehicle.isParked === true) return res.status(409).json({ message: "Vehicle already parked." });

    const parkingArea = await ParkingArea.findById(req.body.parkingAreaId);
    if (!parkingArea) return res.status(404).json({ message: "Parking area not found for given id." });

    const parking = new Parking(req.body);
    const savedParking = await parking.save(); // Call the save method to trigger the pre hook

    return res.json(savedParking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedParking) return res.status(404).json({ message: "Parking not found for given id." });

    return res.json(updatedParking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// TODO: refactor the logic for "save" and "remove" pre middleware logic, middleware logic can also be written here, think about it, should I use fawn?
router.delete("/:id", async (req, res) => {
  try {
    const parking = await Parking.findByIdAndRemove(req.params.id);
    if (!parking) return res.status(404).json({ message: "Parking not found for given id." });
    else await parking.remove(); // Call the remove method to trigger the pre hook

    return res.json({ message: "Parking deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
