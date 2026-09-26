"use client";

import { ArrowDown } from "lucide-react";

export default function HeroCta() {
  return (
    <a
      href="#library"
      onClick={(event) => {
        event.preventDefault();
        document
          .getElementById("library")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-accent/90"
    >
      Browse Workouts
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-background">
        <ArrowDown size={13} strokeWidth={3} className="text-accent" />
      </span>
    </a>
  );
}
