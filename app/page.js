import { getCourses } from "@/data/courses";
import CourseCard from "@/components/CourseCard";
import SectionTitle from "@/components/SectionTitle";
import Button from "@/components/Button";

export default async function Home() {
  const courses = await getCourses();
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
          <Button href="/courses">Browse Courses</Button>
          <Button href="/instructors" variant="outline">Meet Instructors</Button>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <SectionTitle
          title="Featured Courses"
          action={<Button href="/courses" variant="link">View all →</Button>}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
}
