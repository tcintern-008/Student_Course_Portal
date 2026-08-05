const express = require("express");
const logger = require("./middleware/logger");
const coursesRoutes = require("./routes/courses");
const instructorsRoutes = require("./routes/instructors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Student Course Portal API is running" });
});

app.use("/api/courses", coursesRoutes);
app.use("/api/instructors", instructorsRoutes);

// catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
