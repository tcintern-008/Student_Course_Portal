const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseBySlug, getRelatedCourses } = require("../controllers/coursesController");

router.get("/", getAllCourses);
router.get("/:slug", getCourseBySlug);
router.get("/:slug/related", getRelatedCourses);

module.exports = router;
