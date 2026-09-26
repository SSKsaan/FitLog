"use client";

import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type PlanContextValue = {
  planIds: number[];
  savedIds: number[];
  planCount: number;
  savedCount: number;
  hydrated: boolean;
  addToPlan: (workoutId: number) => void;
  saveForLater: (workoutId: number) => void;
  removeFromPlan: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
};

const STORAGE_KEY = "fitlog-plan";

type LoadedIds = { plan: number[]; saved: number[]; hydrated: boolean };

const EMPTY_IDS: LoadedIds = { plan: [], saved: [], hydrated: false };

let ids: LoadedIds = EMPTY_IDS;
const listeners = new Set<() => void>();

function parse(raw: string | null): LoadedIds {
  try {
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      plan: Array.isArray(parsed.plan)
        ? parsed.plan.filter((id: unknown) => typeof id === "number")
        : [],
      saved: Array.isArray(parsed.saved)
        ? parsed.saved.filter((id: unknown) => typeof id === "number")
        : [],
      hydrated: true,
    };
  } catch {
    return { ...EMPTY_IDS, hydrated: true };
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
  return EMPTY_IDS;
}

function load() {
  try {
    ids = parse(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    ids = { ...EMPTY_IDS, hydrated: true };
  }
  listeners.forEach((listener) => listener());
}

function update(mutate: (current: LoadedIds) => Omit<LoadedIds, "hydrated">) {
  ids = { ...mutate(ids), hydrated: ids.hydrated };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable; keep using in-memory state
  }
  listeners.forEach((listener) => listener());
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
    planCount: ids.plan.length,
    savedCount: ids.saved.length,
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