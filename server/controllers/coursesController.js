const courses = require("../data/courses");

function getAllCourses(req, res) {
  const { level, search } = req.query;
  let result = courses;

  if (level) {
    result = result.filter((c) => c.level.toLowerCase() === level.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
    );
  }

  res.json(result);
}

function getCourseBySlug(req, res) {
  const course = courses.find((c) => c.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  res.json(course);
}

function getRelatedCourses(req, res) {
  const course = courses.find((c) => c.slug === req.params.slug);

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const limit = Number(req.query.limit) || 3;

  const related = courses
    .filter((c) => c.slug !== course.slug && c.level === course.level)
    .concat(courses.filter((c) => c.slug !== course.slug && c.level !== course.level))
    .slice(0, limit);

  res.json(related);
}

module.exports = { getAllCourses, getCourseBySlug, getRelatedCourses };
