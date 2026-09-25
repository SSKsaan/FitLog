"use client";

import { Bookmark, CalendarPlus } from "lucide-react";
import { usePlan } from "@/lib/plan-context";

type WorkoutActionsProps = {
  workoutId: number;
};

export default function WorkoutActions({ workoutId }: WorkoutActionsProps) {
  const { addToPlan, saveForLater, planIds, savedIds } = usePlan();
  const planned = planIds.includes(workoutId);
  const saved = savedIds.includes(workoutId);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => addToPlan(workoutId)}
        className={
          planned
            ? "inline-flex items-center justify-center gap-2 rounded-xl bg-accent/10 px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-accent transition-colors"
            : "inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-background transition-colors hover:bg-accent/90"
        }
      >
        <CalendarPlus size={16} className="shrink-0" />
        {planned ? "Added to Today's Plan" : "Add to Today's Plan"}
      </button>
      <button
        type="button"
        onClick={() => saveForLater(workoutId)}
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