import instructors from "@/data/instructors";
import InstructorCard from "@/components/InstructorCard";
import SectionTitle from "@/components/SectionTitle";

export const metadata = {
  title: "Instructors | Student Course Portal",
};

export default function InstructorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionTitle
        title="Meet the Instructors"
        subtitle="The people behind our courses, ready to help you learn by doing."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.name} instructor={instructor} />
        ))}
      </div>
    </div>
  );
}
