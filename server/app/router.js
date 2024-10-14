const express = require("express");

const router = express.Router();

const upload = require("./services/upload");

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */
// **INSTRUCTORS** \\
const instructors = require("./controllers/instructorActions");

router.get("/instructors", instructors.browse);
router.get("/instructors/:id", instructors.read);
router.post("/instructors", upload.uploadInstructor, instructors.add);
router.put("/instructors/:id", upload.uploadInstructor, instructors.edit);
router.delete("/instructors/:id", instructors.destroy);

// **STUDENTS** \\
const students = require("./controllers/studentActions");

router.get("/students", students.browse);
router.get("/students/level/:level", students.browseByLevel);
router.get("/students/:id", students.read);
router.post("/students", students.add);
router.put("/students/:id", students.edit);
router.delete("/students/:id", students.destroy);

// **WORKSHOPS** \\
const workshops = require("./controllers/workshopActions");

router.get("/workshops", workshops.browse);
// router.get("/workshops/level/:level", workshops.browseByLevel);
// router.get("/workshops/date/:workshopDate", workshops.browseByDate);
router.get("/workshops/:id", workshops.read);
router.post("/workshops", workshops.add);
router.put("/workshops/:id", workshops.edit);
router.delete("/workshops/:id", workshops.destroy);

// **LOCATION** \\

const locations = require("./controllers/locationActions");

router.get("/locations", locations.browse);
router.get("/locations/city/:city", locations.browseByCity);
router.get("/locations/:id", locations.read);
router.post("/locations", locations.add);
router.put("/locations/:id", locations.edit);
router.delete("/locations/:id", locations.destroy);

/* ************************************************************************* */

module.exports = router;
