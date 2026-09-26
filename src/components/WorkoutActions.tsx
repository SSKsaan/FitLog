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
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={handleAdd}
        aria-disabled={addDisabled}
        aria-label={atCap ? "Add to Today's Plan (full)" : "Add to Today's Plan"}
        className={
          planned
            ? "inline-flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-accent transition-colors"
            : addDisabled
              ? "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-muted/40 px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-muted/60"
              : "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-background transition-colors hover:bg-accent/90"
        }
      >
        <CalendarPlus size={16} className="shrink-0" />
        {planned ? "Added to Today's Plan" : "Add to Today's Plan"}
      </button>
      <button
        type="button"
        onClick={handleSave}
        className={
          saved
            ? "inline-flex items-center justify-center gap-2 rounded-xl border border-muted px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-muted transition-colors"
            : "inline-flex items-center justify-center gap-2 rounded-xl border border-muted px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-foreground transition-colors hover:bg-surface"
        }
      >
        <Bookmark size={16} className="shrink-0" />
        {saved ? "Saved for Later" : "Save for Later"}
      </button>
    </div>
  );
}