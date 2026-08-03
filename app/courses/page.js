import courses from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export const metadata = {
  title: "Courses | Student Course Portal",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl font-extrabold">All Courses</h1>
      <p className="mt-2 text-foreground/70">
        Pick a track and start learning. Click any course to see the full breakdown.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </div>
  );
}
