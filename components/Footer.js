export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-5 py-8 text-sm text-foreground/70">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-foreground">
            Student <span className="text-blue-600">Course</span> Portal
          </p>
          <div className="flex flex-col gap-1 sm:text-right">
            <p>
              Built by <span className="font-medium text-foreground">Rayyan Bashir</span> · Student ID{" "}
              <span className="font-medium text-foreground">SP24-BCS-059</span>
            </p>
            <p>
              Web Development Intern (<span className="font-medium text-foreground">tcintern-008</span>) at{" "}
              <span className="font-medium text-foreground">Think and Code</span>
            </p>
          </div>
        </div>
        <p className="mt-6 text-xs text-foreground/50">
          © {new Date().getFullYear()} Student Course Portal. Built with Next.js & Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
