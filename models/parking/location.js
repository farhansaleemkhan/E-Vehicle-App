const Joi = require("joi");
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  xCoordinates: {
    type: String,
    minlength: 5,
    maxlength: 1028,
    required: true,
  },
  yCoordinates: {
    type: String,
    minlength: 5,
    maxlength: 1028,
    required: true,
  },
});

const Location = mongoose.model("Location", locationSchema);

function validateLocation(location) {
  const schema = {
    xCoordinates: Joi.string().min(5).max(1028).required(),
    yCoordinates: Joi.string().min(5).max(1028).required(),
  };

  return Joi.validate(location, schema);
}

exports.Location = Location;
exports.validate = validateLocation;
