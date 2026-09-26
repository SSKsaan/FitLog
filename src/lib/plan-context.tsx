"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Ids = { plan: number[]; saved: number[] };

type LoadedIds = Ids & { hydrated: boolean };

type PlanContextValue = {
  planIds: number[];
  savedIds: number[];
  hydrated: boolean;
  addToPlan: (workoutId: number) => void;
  saveForLater: (workoutId: number) => void;
  removeFromPlan: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
};

const STORAGE_KEY = "fitlog-plan";

const EMPTY_IDS: Ids = { plan: [], saved: [] };
const SERVER_IDS: LoadedIds = { ...EMPTY_IDS, hydrated: false };

let ids: LoadedIds = SERVER_IDS;
const listeners = new Set<() => void>();

function parse(raw: string | null): Ids {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    const list = (key: keyof Ids) =>
      Array.isArray(parsed[key])
        ? parsed[key].filter((id: unknown) => typeof id === "number")
        : [];
    return { plan: list("plan"), saved: list("saved") };
  } catch {
    return EMPTY_IDS;
  }
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): LoadedIds {
  return ids;
}

function getServerSnapshot(): LoadedIds {
  return SERVER_IDS;
}

function notify() {
  listeners.forEach((listener) => listener());
}

function load() {
  try {
    ids = { ...parse(window.localStorage.getItem(STORAGE_KEY)), hydrated: true };
  } catch {
    ids = { ...EMPTY_IDS, hydrated: true };
  }
  notify();
}

function update(mutate: (current: LoadedIds) => Ids) {
  const next = mutate(ids);
  ids = { ...next, hydrated: ids.hydrated };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable; keep using in-memory state
  }
  notify();
}

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    load();
  }, []);

  const value: PlanContextValue = {
    planIds: ids.plan,
    savedIds: ids.saved,
    hydrated: ids.hydrated,
    addToPlan: (workoutId) =>
      update(({ plan, saved }) => ({
        saved,
        plan: plan.includes(workoutId) ? plan : [...plan, workoutId],
      })),
    saveForLater: (workoutId) =>
      update(({ plan, saved }) => ({
        plan,
        saved: saved.includes(workoutId) ? saved : [...saved, workoutId],
      })),
    removeFromPlan: (workoutId) =>
      update(({ plan, saved }) => ({
        saved,
        plan: plan.filter((id) => id !== workoutId),
      })),
    removeFromSaved: (workoutId) =>
      update(({ plan, saved }) => ({
        plan,
        saved: saved.filter((id) => id !== workoutId),
      })),
  };

  return (
    <PlanContext.Provider value={value}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return ctx;
}
