import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
      <p className="text-7xl font-extrabold text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-foreground/70">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Button href="/" className="mt-8">Back to Home</Button>
    </div>
  );
}
