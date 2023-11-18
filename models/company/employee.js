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
  assignedVehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
  },
  assignedVehicle: {
    type: String,
    default: "false",
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

function validateEmployee(employee) {
  const schema = {
    companyId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    departmentId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    assignedVehicleId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    assignedVehicle: Joi.string().min(3).max(5),

    // this will be used to create User first, and then this userId will be assigned to employee automatically
    username: Joi.string().min(2).max(50).required(),
    fullName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(4).max(255).required(),
    phone: Joi.string().min(4).max(128).required(),
    address: Joi.string().min(5).max(1024).required(),
    country: Joi.string().min(2).max(128).required(),
    city: Joi.string().min(2).max(128).required(),
    type: Joi.string().valid("employee", "company").required(),
  };

  return Joi.validate(employee, schema);
}

function validateAssignVehicle(assignVehicle) {
  const schema = {
    employeeId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    vehicleId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    assign: Joi.boolean().required(),
  };

  return Joi.validate(assignVehicle, schema);
}

exports.Employee = Employee;
exports.validate = validateEmployee;
exports.validateAssignVehicle = validateAssignVehicle;
