const express = require("express");
const router = express.Router();
const _ = require("lodash");

const {
  ParkingArea,
  validate,
  validateParkingVehicle,
  validateFindParkingAreas,
} = require("../../models/parking/parkingArea");
const { Employee } = require("../../models/company/employee");

// if we send query string parameters from client-side, it will automatically apply it as well
router.get("/", async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find(req.query).populate({
      path: "belongsTo",
      populate: {
        path: "userId",
        select: "-password",
      },
    });

    return res.json(parkingAreas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findById(req.params.id);
    if (!parkingArea) return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json(parkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    let isAlreadyExist = await ParkingArea.findOne({ name: req.body.name });
    if (isAlreadyExist)
      return res.status(400).send({ message: "Parking area already available for given name." });

    const parkingArea = new ParkingArea(req.body);
    const savedParkingArea = await parkingArea.save();
    return res.json(savedParkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// router.post("/find-parkings/", async (req, res) => {
//   try {
//     const { error } = validateFindParkingAreas(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     const { companyId, startTime, endTime } = req.body;

//     const parkingAreas = await ParkingArea.find({
//       belongsTo: companyId,
//       $or: [
//         {
//           $and: [
//             { "reservations.startTime": { $lt: endTime } },
//             { "reservations.endTime": { $gt: startTime } },
//           ],
//         },
//         {
//           $and: [
//             { "reservations.startTime": { $gte: startTime } },
//             { "reservations.endTime": { $lt: endTime } },
//           ],
//         },
//       ],
//     });

//     return res.json(parkingAreas);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

// router.put("/park-vehicles", async (req, res) => {
//   try {
//     const { error } = validateParkingVehicle(req.body);
//     if (error) return res.status(400).json({ message: error.details[0].message });

//     let parkingArea = await ParkingArea.findOne({ _id: req.body.parkingAreaId });
//     if (!parkingArea) return res.status(400).send({ message: "Parking doesnt exist for given id." });

//     let isEmplpoyeeExist = await Employee.findOne({ _id: req.body.employeeId });
//     if (!isEmplpoyeeExist)
//       return res.status(400).send({ message: "Employee doesnt exist for given id." });

//     // TODO: add check for parkingArea belongs to is same as employee belongs to
//     // TODO: can employee can have more than one reservation

//     parkingArea.reservations.push(_.pick(req.body, ["startTime", "endTime", "employeeId"]));
//     parkingArea.bookedSlots++;

//     const savedParkingArea = await parkingArea.save();
//     return res.json(savedParkingArea);
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedParkingArea = await ParkingArea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedParkingArea)
      return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json(updatedParkingArea);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// TODO: when a parkingArea is deleted, all the parkings in that parkingArea should be deleted
router.delete("/:id", async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findByIdAndRemove(req.params.id);
    if (!parkingArea) return res.status(404).json({ message: "Parking area not found for given id." });

    return res.json({ message: "parking area deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
