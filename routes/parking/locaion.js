const express = require("express");
const router = express.Router();

const { Location, validate } = require("../../models/parking/location");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    return res.json(locations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) return res.status(404).json({ message: "Location not found for given id." });

    return res.json(location);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const location = new Location(req.body);
    const savedLocation = await location.save();
    return res.json(savedLocation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedLocaion = await Location.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedLocaion) return res.status(404).json({ message: "Location not found for given id." });

    return res.json(updatedLocaion);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const location = await Location.findByIdAndRemove(req.params.id);
    if (!location) return res.status(404).json({ message: "Location not found for given id." });

    return res.json({ message: "Location deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
