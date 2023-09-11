const Joi = require("joi");
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const Department = mongoose.model("Department", departmentSchema);

function validateDepartment(company) {
  const schema = {
    name: Joi.string().min(2).max(255).required(),
    companyId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  };

  return Joi.validate(company, schema);
}

exports.Department = Department;
exports.validate = validateDepartment;
