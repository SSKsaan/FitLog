"use client";

import { useSyncExternalStore } from "react";
import Spinner from "@/components/Spinner";

const subscribe = () => () => {};

export default function AppLoading() {
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (hydrated) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <Spinner />
        <p className="font-heading text-sm font-bold uppercase tracking-widest text-muted">
          Loading FitLog…
        </p>
      </div>
    </div>
  );
}
