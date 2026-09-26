"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import SortDropdown, { type SortOption } from "@/components/SortDropdown";
import { showToast } from "@/lib/toast";
import { usePlan } from "@/lib/plan-context";
import type { Workout } from "@/types/workout";

type Tab = "plan" | "saved";

const tabs: { id: Tab; label: string }[] = [
  { id: "plan", label: "Today's Plan" },
  { id: "saved", label: "Saved" },
];

type MyPlanProps = {
  workouts: Workout[];
};

export default function MyPlan({ workouts }: MyPlanProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { planIds, savedIds, removeFromPlan, removeFromSaved } = usePlan();
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const activeTab: Tab = searchParams.get("tab") === "saved" ? "saved" : "plan";
  const activeIds = activeTab === "plan" ? planIds : savedIds;
  const activeWorkouts = workouts
    .filter((workout) => activeIds.includes(workout.id))
    .sort((a, b) => b[sortBy] - a[sortBy]);
  const removeWorkout = activeTab === "plan" ? removeFromPlan : removeFromSaved;

  const metrics = [
    {
      label: "Exercises",
      value: activeWorkouts.length,
      accent: true,
      align: "left",
    },
    {
      label: "Minutes",
      value: activeWorkouts.reduce((sum, workout) => sum + workout.duration, 0),
      accent: false,
      align: "center",
    },
    {
      label: "Calories",
      value: activeWorkouts.reduce(
        (sum, workout) => sum + workout.caloriesBurned,
        0
      ),
      accent: false,
      align: "right",
    },
  ];

  function switchTab(tab: Tab) {
    router.push(tab === "plan" ? "/my-plan" : "/my-plan?tab=saved");
  }

  function removeWorkoutWithToast(workout: Workout) {
    removeWorkout(workout.id);
    showToast(
      activeTab === "plan"
        ? "Removed from today's plan."
        : "Removed from saved."
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
      <h1 className="font-heading text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-3 text-muted">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="mt-8 flex flex-col overflow-hidden rounded-2xl border border-line bg-card sm:flex-row">
        {metrics.map((metric, index) => (
          <Fragment key={metric.label}>
            {index > 0 && (
              <span className="mx-4 h-px bg-line sm:mx-0 sm:h-10 sm:w-px sm:self-center" />
            )}
            <div className={`flex-1 px-4 py-6 sm:px-6 sm:py-7 ${
              metric.align === "center"
                ? "text-left sm:text-center"
                : metric.align === "right"
                ? "text-left sm:text-right"
                : "text-left"
            }`}>
              <p className="text-sm font-semibold tracking-wide text-muted sm:text-xs">
                {metric.label}
              </p>
              <p
                className={`mt-1 font-heading text-3xl font-bold ${
                  metric.accent ? "text-accent" : "text-foreground"
                }`}
              >
                {metric.value}
              </p>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <div className="inline-flex rounded-xl border border-line bg-surface p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => switchTab(tab.id)}
              className={
                activeTab === tab.id
                  ? "rounded-lg bg-background px-3 py-1.5 text-sm font-bold text-accent transition-colors"
                  : "rounded-lg px-3 py-1.5 text-sm font-bold text-muted transition-colors hover:text-foreground"
              }
            >
              {tab.label}
            </button>
          ))}
        </div>
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {activeWorkouts.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-4 rounded-3xl border-2 border-dotted border-line bg-card px-6 py-14 text-center">
          <h2 className="font-heading text-xl font-bold uppercase text-foreground">
            Nothing here yet
          </h2>
          <p className="max-w-sm text-sm text-muted">
            Browse the library and add a lift to get today moving.
          </p>
          <Link
            href="/"
            className="mt-2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-background transition-colors hover:bg-accent/90"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {activeWorkouts.map((workout) => (
            <li
              key={workout.id}
              className="rounded-2xl border border-line bg-card p-3 sm:p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden rounded-xl sm:w-32">
                  <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 128px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 sm:basis-40">
                  <h2 className="font-heading text-2xl font-semibold uppercase leading-snug text-foreground sm:text-xl">
                    {workout.name}
                  </h2>
                  <p className="mt-1 text-base text-muted sm:mt-0.5 sm:text-sm">
                    {workout.equipment}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-base text-muted sm:text-sm">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-accent" />
                      {workout.duration} min
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Flame size={14} className="text-accent" />
                      {workout.caloriesBurned} kcal
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star size={14} className="text-accent" />
                      {workout.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2 sm:ml-auto sm:w-auto">
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex-1 justify-center rounded-full border border-muted px-4 pt-2.5 pb-3 text-center text-[13px] font-bold leading-none text-muted transition-colors hover:bg-surface hover:text-foreground sm:flex-none"
                  >
                    View Details
                  </Link>
                  {activeTab === "plan" && (
                    <button
                      type="button"
                      onClick={() => {
                        removeFromPlan(workout.id);
                        showToast("Workout Logged - Nice Work");
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 pt-2.5 pb-3 text-[13px] font-bold leading-none text-background transition-colors hover:bg-accent/90 sm:flex-none"
                    >
                      <Check size={16} />
                      Mark as Done
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => removeWorkoutWithToast(workout)}
                    aria-label={`Remove ${workout.name} from ${
                      activeTab === "plan" ? "today's plan" : "saved"
                    }`}
                    className="p-1 text-muted transition-colors hover:text-foreground"
                  >
                    <X size={22} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}