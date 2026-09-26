import { workouts as backupWorkouts } from "@/data/workouts";
import type { Workout } from "@/types/workout";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function fetchCatalogue(): Promise<Workout[] | null> {
  if (!API_URL) return null;
  return fetchJson<Workout[]>(API_URL);
}

export async function getWorkouts(): Promise<Workout[]> {
  return (await fetchCatalogue()) ?? backupWorkouts;
}

export async function getWorkoutById(id: number): Promise<Workout | undefined> {
  const backup = backupWorkouts.find((w) => w.id === id);
  if (!API_URL) return backup;
  return (await fetchJson<Workout>(`${API_URL}/${id}`)) ?? backup;
}
