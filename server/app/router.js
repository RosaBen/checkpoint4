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


/* ************************************************************************* */

module.exports = router;
