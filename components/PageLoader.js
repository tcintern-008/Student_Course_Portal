export default function PageLoader({ label = "Loading..." }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-5 py-32 text-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-blue-600" />
      <p className="mt-4 text-sm text-foreground/60">{label}</p>
    </div>
  );
}
