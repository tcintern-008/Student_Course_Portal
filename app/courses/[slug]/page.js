import Link from "next/link";
import { notFound } from "next/navigation";
import courses from "@/data/courses";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export function generateMetadata({ params }) {
  const course = courses.find((c) => c.slug === params.slug);
  return { title: course ? `${course.title} | Student Course Portal` : "Course Not Found" };
}

export default function CourseDetailsPage({ params }) {
  const course = courses.find((c) => c.slug === params.slug);

  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Link href="/courses" className="text-sm font-semibold text-blue-600">
        ← Back to Courses
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600">
          {course.level}
        </span>
        <span className="text-sm text-foreground/60">{course.duration}</span>
      </div>

      <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">{course.title}</h1>
      <p className="mt-2 text-foreground/60">Taught by {course.instructor}</p>

      <p className="mt-6 text-foreground/80 leading-relaxed">{course.description}</p>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-bold">What You'll Learn</h2>
        <ul className="mt-4 space-y-2">
          {course.topics.map((topic) => (
            <li key={topic} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-1 text-blue-600">✓</span>
              {topic}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className="mt-8 inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
      >
        Enroll Interest
      </Link>
    </div>
  );
}
