import { notFound } from "next/navigation";
import courses from "@/data/courses";
import Button from "@/components/Button";
import CourseCard from "@/components/CourseCard";
import SectionTitle from "@/components/SectionTitle";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  return { title: course ? `${course.title} | Student Course Portal` : "Course Not Found" };
}

export default async function CourseDetailsPage({ params }) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) notFound();

  const related = courses
    .filter((c) => c.slug !== course.slug && c.level === course.level)
    .concat(courses.filter((c) => c.slug !== course.slug && c.level !== course.level))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Button href="/courses" variant="link">← Back to Courses</Button>

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

      <Button href="/contact" className="mt-8">Enroll Interest</Button>

      {related.length > 0 && (
        <div className="mt-16">
          <SectionTitle title="Related Courses" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
