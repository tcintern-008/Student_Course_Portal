import Link from "next/link";
import courses from "@/data/courses";
import CourseCard from "@/components/CourseCard";

export default function Home() {
  const featured = courses.slice(0, 3);

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 py-20 text-center">
        <span className="rounded-full bg-blue-600/10 px-4 py-1 text-xs font-semibold text-blue-600">
          Think and Code · Internship Project
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
          Learn Skills That <span className="text-blue-600">Actually Matter</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-foreground/70">
          Browse courses, meet the instructors behind them, and find the right track to grow
          your career in tech.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Browse Courses
          </Link>
          <Link
            href="/instructors"
            className="rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            Meet Instructors
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Featured Courses</h2>
          <Link href="/courses" className="text-sm font-semibold text-blue-600">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
