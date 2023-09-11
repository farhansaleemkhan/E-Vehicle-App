const Joi = require("joi");
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
});

const Company = mongoose.model("Company", companySchema);

function validateCompany(company) {
  const schema = {
    name: Joi.string().min(2).max(255).required(),
    address: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(company, schema);
}

exports.Company = Company;
exports.validate = validateCompany;
