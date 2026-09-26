"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { FailedIcon, showToast } from "@/lib/toast";
import { usePlan } from "@/lib/plan-context";

type WorkoutActionsProps = {
  workoutId: number;
};

export default function WorkoutActions({ workoutId }: WorkoutActionsProps) {
  const { addToPlan, saveForLater, planIds, savedIds } = usePlan();
  const planned = planIds.includes(workoutId);
  const saved = savedIds.includes(workoutId);
  const atCap = planIds.length >= 5;
  const addDisabled = !planned && atCap;

  const base =
    "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none transition-colors sm:w-auto";

  function handleAdd() {
    if (planned) {
      showToast("Already in your plan list.", FailedIcon);
      return;
    }
    if (atCap) {
      showToast("Today's plan is full - finish them first!", FailedIcon);
      return;
    }
    addToPlan(workoutId);
    showToast("Added to today's plan.");
  }

  function handleSave() {
    if (saved) {
      showToast("Already in your saved list.", FailedIcon);
      return;
    }
    saveForLater(workoutId);
    showToast("Saved for later.");
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
      <button
        type="button"
        onClick={handleAdd}
        aria-disabled={addDisabled}
        aria-label={atCap ? "Add to Today's Plan (full)" : "Add to Today's Plan"}
        className={`${base} ${
          planned
            ? "bg-accent/10 text-accent"
            : addDisabled
              ? "cursor-not-allowed border border-muted/40 text-muted/60"
              : "bg-accent text-background hover:bg-accent/90"
        }`}
      >
        <CalendarPlus size={16} className="shrink-0" />
        {planned ? "Added to Today's Plan" : "Add to Today's Plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className={`${base} border border-muted ${
          saved ? "text-muted" : "text-foreground hover:bg-surface"
        }`}
      >
        <Bookmark size={16} className="shrink-0" />
        {saved ? "Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
}