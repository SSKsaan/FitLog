"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type PlanContextValue = {
  planIds: number[];
  savedIds: number[];
  planCount: number;
  savedCount: number;
  addToPlan: (workoutId: number) => void;
  saveForLater: (workoutId: number) => void;
  removeFromPlan: (workoutId: number) => void;
  removeFromSaved: (workoutId: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);

  const value = {
    planIds,
    savedIds,
    planCount: planIds.length,
    savedCount: savedIds.length,
    addToPlan: (workoutId: number) =>
      setPlanIds((ids) =>
        ids.includes(workoutId) ? ids : [...ids, workoutId]
      ),
    saveForLater: (workoutId: number) =>
      setSavedIds((ids) =>
        ids.includes(workoutId) ? ids : [...ids, workoutId]
      ),
    removeFromPlan: (workoutId: number) =>
      setPlanIds((ids) => ids.filter((id) => id !== workoutId)),
    removeFromSaved: (workoutId: number) =>
      setSavedIds((ids) => ids.filter((id) => id !== workoutId)),
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