const express = require("express");
const router = express.Router();
const { getAllInstructors, getInstructorById } = require("../controllers/instructorsController");

router.get("/", getAllInstructors);
router.get("/:id", getInstructorById);

module.exports = router;
