"use client";

import Spinner from "@/components/Spinner";

export default function PlanLoading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 py-28 sm:px-8 lg:px-12">
      <Spinner />
      <p className="font-heading text-sm font-bold uppercase tracking-widest text-muted">
        Loading workout…
      </p>
    </div>
  );
}