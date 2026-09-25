import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return await res.json();
  } catch {
    throw new Error("Failed to load workouts. Please try again later.");
  }
}

export async function getWorkoutById(id: number): Promise<Workout | undefined> {
  try {
    const workouts = await getWorkouts();
    return workouts.find((workout) => workout.id === id);
  } catch {
    throw new Error("Failed to load workout. Please try again later.");
  }
}