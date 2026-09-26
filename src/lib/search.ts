import type { Workout } from "@/types/workout";

export function matchesQuery(workout: Workout, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) {
    return true;
  }
  return (
    workout.name.toLowerCase().includes(q) ||
    workout.muscleGroups.some((group) => group.toLowerCase().includes(q))
  );
}