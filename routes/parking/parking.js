const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Fawn = require("fawn");
const _ = require("lodash");

Fawn.init(mongoose);

const { Parking, validate } = require("../../models/parking/parking");

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

    const parking = new Parking(req.body);
    const savedParking = await parking.save();

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
