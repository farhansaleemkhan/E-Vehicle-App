const express = require("express");
const router = express.Router();

const { FuelType, validate } = require("../../models/vehicle/fuelType");

router.get("/", async (req, res) => {
  try {
    const fuelTypes = await FuelType.find();
    return res.json(fuelTypes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const fuelType = await FuelType.findById(req.params.id);
    if (!fuelType) return res.status(404).json({ message: "FuelType not found for given id." });

    return res.json(fuelType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let alreadyExist = await FuelType.findOne({ name: req.body.name });
    if (alreadyExist)
      return res.status(400).send({ message: "Fuel Type already available for given name." });

    const fuelType = new FuelType(req.body);
    const savedFuelType = await fuelType.save();
    return res.json(savedFuelType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedFuelType = await FuelType.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFuelType) return res.status(404).json({ message: "FuelType not found for given id." });

    return res.json(updatedFuelType);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// TODO: when a fuel type is deleted, all the respective fuel types should be deleted
router.delete("/:id", async (req, res) => {
  try {
    const fuelType = await FuelType.findByIdAndRemove(req.params.id);
    if (!fuelType) return res.status(404).json({ message: "FuelType not found for given id." });

    return res.json({ message: "FuelType deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
