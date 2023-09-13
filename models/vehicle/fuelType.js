const Joi = require("joi");
const mongoose = require("mongoose");

const fuelTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 128,
    unique: true,
  },
});

const FuelType = mongoose.model("FuelType", fuelTypeSchema);

function validateFuelType(fuelType) {
  const schema = {
    name: Joi.string().min(2).max(128).required(),
  };

  return Joi.validate(fuelType, schema);
}

exports.FuelType = FuelType;
exports.validate = validateFuelType;
