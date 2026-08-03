export default function InstructorCard({ instructor }) {
  const initials = instructor.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center transition-shadow hover:shadow-lg">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
        {initials}
      </div>
      <h3 className="mt-4 text-lg font-bold">{instructor.name}</h3>
      <p className="text-sm font-medium text-blue-600">{instructor.role}</p>
      <p className="mt-3 text-sm text-foreground/70">{instructor.bio}</p>
      <p className="mt-4 text-xs text-foreground/50">Teaches: {instructor.courses.join(", ")}</p>
    </div>
  );
}
