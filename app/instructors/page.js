import instructors from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";

export const metadata = {
  title: "Instructors | Student Course Portal",
};

export default function InstructorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="text-3xl font-extrabold">Meet the Instructors</h1>
      <p className="mt-2 text-foreground/70">
        The people behind our courses, ready to help you learn by doing.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.name} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}
