import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import type { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/50"
    >
      <div className="relative aspect-[3/2] overflow-hidden">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent"
            >
              {group}
            </span>
          ))}
        </div>
        <h3 className="font-heading text-lg font-semibold uppercase leading-snug text-foreground">
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <div className="mt-auto flex flex-wrap items-center gap-4 border-t border-line pt-3 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={14} />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={14} className="text-accent" />
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}