const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.json(user);
  } catch (error) {
    return res.json(error);
  }
});

router.post("/", async (req, res) => {
  await createUser(req, res);
});

async function createUser(req, res) {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    _.pick(req.body, [
      "username",
      "fullName",
      "email",
      "password",
      "phone",
      "address",
      "country",
      "city",
      "type",
    ])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // const token = user.generateAuthToken();
  // res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));

  return user;
}

module.exports = { router, createUser };
