const Joi = require("joi");
const mongoose = require("mongoose");

const vehicleTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
    unique: true,
  },
});

const VehicleType = mongoose.model("VehicleType", vehicleTypeSchema);

function validateVehicleType(vehicleType) {
  const schema = {
    name: Joi.string().min(2).max(128).required(),
  };

  return Joi.validate(vehicleType, schema);
}

exports.VehicleType = VehicleType;
exports.validate = validateVehicleType;
