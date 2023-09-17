const Joi = require("joi");
const mongoose = require("mongoose");

const parkingAreaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
    unique: true,
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
    min: 1,
    max: 99999999999,
  },
  bookedSlots: {
    type: Number,
    min: 0,
    max: 99999999999,
    default: 0,
  },
  locationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: true,
  },
});

const ParkingArea = mongoose.model("ParkingArea", parkingAreaSchema);

function validateParkingArea(parkingArea) {
  const schema = {
    name: Joi.string().min(2).max(128).required(),
    belongsTo: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
    totalSlots: Joi.number().min(1).max(99999999999).required(),
    bookedSlots: Joi.number().min(0).max(99999999999),
    locationId: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  };

  return Joi.validate(parkingArea, schema);
}

exports.ParkingArea = ParkingArea;
exports.validate = validateParkingArea;
