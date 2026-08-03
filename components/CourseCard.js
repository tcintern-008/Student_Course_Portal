import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
            {course.level}
          </span>
          <span className="text-xs text-foreground/60">{course.duration}</span>
        </div>
        <h3 className="text-lg font-bold">{course.title}</h3>
        <p className="mt-2 text-sm text-foreground/70">{course.summary}</p>
        <p className="mt-3 text-xs text-foreground/50">Instructor: {course.instructor}</p>
      </div>
      <Link
        href={`/courses/${course.slug}`}
        className="mt-5 inline-flex w-fit items-center gap-1 text-sm font-semibold text-blue-600 hover:gap-2 transition-all"
      >
        View Details →
      </Link>
    </div>
  );
}
