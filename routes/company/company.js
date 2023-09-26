const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { Company, validate } = require("../../models/company/company");
const { createUser } = require("../users");

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

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // this will create User first, and then user._id will be added to company document
    let user = await createUser(req, res);

    const company = new Company({ ...req.body, userId: user._id });
    const savedCompany = await company.save();

    const token = user.generateAuthToken();
    let data = {
      ..._.pick(user, ["", "username", "fullName", "email", "type"]),
      ..._.pick(savedCompany, ["_id", "userId"]),
    };

    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .json({ data });
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

// TODO: when a company is deleted, all the employees, departments, and parkingAreas related to it should be deleted
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
