import courses from "@/data/courses";
import SectionTitle from "@/components/SectionTitle";
import CourseSearch from "@/components/CourseSearch";

export const metadata = {
  title: "Courses | Student Course Portal",
};

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionTitle
        title="All Courses"
        subtitle="Pick a track and start learning. Click any course to see the full breakdown."
      />
      <CourseSearch courses={courses} />
    </div>
  );
}
