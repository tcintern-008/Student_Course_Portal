const instructors = require("../data/instructors");

function getAllInstructors(req, res) {
  const { course } = req.query;
  let result = instructors;

  if (course) {
    result = result.filter((i) => i.courses.some((c) => c.toLowerCase().includes(course.toLowerCase())));
  }

  res.json(result);
}

function getInstructorById(req, res) {
  const instructor = instructors.find((i) => i.id === req.params.id);

  if (!instructor) {
    return res.status(404).json({ message: "Instructor not found" });
  }

  res.json(instructor);
}

module.exports = { getAllInstructors, getInstructorById };
