"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <h1 className="font-heading text-2xl font-bold uppercase text-foreground">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-muted">
        We couldn&apos;t load the data. Please try again.
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-background transition-colors hover:bg-accent/90"
      >
        Try Again
      </button>
    </div>
  );
}