const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */


// **STUDENTS** \\
const students = require("./controllers/studentActions");

router.get("/students", students.browse);
router.get("/students/:id", students.read);
router.post("/students", students.add);
router.put("/students/:id", students.edit);
router.delete("/students/:id", students.destroy);


// **INSTRUCTORS** \\
const instructors = require("./controllers/instructorActions");

router.get("/instructors", instructors.browse);
router.get("/instructors/:id", instructors.read);
router.post("/instructors", instructors.add);
router.put("/instructors/:id", instructors.edit);
router.delete("/instructors/:id", instructors.destroy);

/* ************************************************************************* */

module.exports = router;
