export default function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-foreground/70">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
