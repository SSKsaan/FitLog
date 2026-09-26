export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <p className="font-heading text-6xl font-bold text-accent">404</p>
      <h1 className="font-heading text-2xl font-bold uppercase text-foreground">
        Page not found
      </h1>
      <p className="max-w-sm text-sm text-muted">
        This page doesn&apos;t exist or may have moved.
        <br />
        Head back to the library.
      </p>
    </div>
  );
}