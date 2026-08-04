"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";

export default function CourseSearch({ courses }) {
  const [query, setQuery] = useState("");

  const filtered = courses.filter((course) => {
    const text = `${course.title} ${course.instructor} ${course.level}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search courses by name, instructor or level..."
        className="w-full rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-blue-600"
      />

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-foreground/60">No courses match "{query}".</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
