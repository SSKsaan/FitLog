import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL).catch(() => null);

  if (!res?.ok) {
    throw new Error("Failed to load workouts. Please try again later.");
  }

  return res.json();
}

export async function getWorkoutById(id: number): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((workout) => workout.id === id);
}