const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const company = require("../routes/company/company");
const department = require("../routes/company/department");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use("/api/companies", company);
  app.use("/api/departments", department);
  app.use(error);
};
