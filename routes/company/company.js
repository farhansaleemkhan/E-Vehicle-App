const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Company, validate } = require("../../models/company/company");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    return res.json(savedCompany);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.json(companies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.find({ _id: req.params.id });
    if (!company) {
      return res.status(404).json({ message: "Company not found for given id." });
    }

    return res.json(company);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCompany) return res.status(404).json({ message: "Company not found for given id." });

    return res.json(updatedCompany);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndRemove(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found for given id." });

    return res.json({ message: "Company deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
