const Joi = require("joi");
const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  manufacturer: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 30,
  },
  model: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 30,
  },
  licensePlateNumber: {
    type: String,
    required: true,
    minlength: 0,
    maxlength: 20,
  },
  chassisNumber: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VehicleType",
    required: true,
  },
  fuelType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FuelType",
    required: true,
  },
  isWorkingFine: {
    type: Boolean,
    default: true,
  },
  fuelGiven: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  fuelConsumed: {
    type: Number,
    min: 0,
    max: 255,
    default: 0,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

function validateVehicle(vehicle) {
  const schema = {
    manufacturer: Joi.string().min(0).max(30).required(),
    model: Joi.string().min(0).max(30).required(),
    licensePlateNumber: Joi.string().min(0).max(20).required(),
    chassisNumber: Joi.string().min(5).max(255).required(),
    vehicleType: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    fuelType: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    isWorkingFine: Joi.boolean(),
    fuelGiven: Joi.number().min(0).max(255).required(),
    fuelConsumed: Joi.number().min(0).max(255),
  };

  return Joi.validate(vehicle, schema);
}

exports.Vehicle = Vehicle;
exports.validate = validateVehicle;
