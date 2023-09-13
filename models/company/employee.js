const Joi = require("joi");
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = {
    // userId: Joi.string()
    //   .regex(/^[0-9a-fA-F]{24}$/)
    //   .required(),
    companyId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    departmentId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),

    // this will be used to create User first, and then this userId will be assigned to employee automatically
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    phone: Joi.string().min(4).max(128).required(),
    address: Joi.string().min(5).max(1024).required(),
    country: Joi.string().min(2).max(128).required(),
    city: Joi.string().min(2).max(128).required(),
  };

  return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
