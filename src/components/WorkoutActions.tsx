import { Bookmark, CalendarPlus } from "lucide-react";

export default function WorkoutActions() {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-background transition-colors hover:bg-accent/90"
      >
        <CalendarPlus size={16} className="shrink-0" />
        Add to Today&apos;s Plan
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-muted px-5 pt-2.5 pb-3 text-[13px] font-bold leading-none text-foreground transition-colors hover:bg-surface"
      >
        <Bookmark size={16} className="shrink-0" />
        Save for Later
      </button>
    </div>
  );
}