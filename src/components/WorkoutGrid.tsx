"use client";

import { useEffect, useState } from "react";
import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import Spinner from "@/components/Spinner";

function sortedWorkouts(workouts: Workout[], sortBy: SortOption): Workout[] {
  return [...workouts].sort((a, b) => b[sortBy] - a[sortBy]);
}

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await getWorkouts();
        if (!cancelled) {
          setWorkouts(data);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load workouts.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="library"
      className="mx-auto w-full max-w-7xl px-6 py-10 sm:px-8 lg:px-12 lg:py-16"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-4 gap-y-4">
        <div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            The Library
          </h2>
          <p className="mt-2 text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
        {!isLoading && <SortDropdown value={sortBy} onChange={setSortBy} />}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : error ? (
        <p className="py-10 text-center text-muted">{error}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedWorkouts(workouts, sortBy).map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}