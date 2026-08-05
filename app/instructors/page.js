import { getInstructors } from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Instructors | Student Course Portal",
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionTitle
        title="Meet the Instructors"
        subtitle="The people behind our courses, ready to help you learn by doing."
      />

      {instructors.length === 0 ? (
        <p className="text-center text-foreground/60">No instructors to show right now.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
      )}
    </div>
  );
}
