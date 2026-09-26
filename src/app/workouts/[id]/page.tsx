import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

type WorkoutPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: WorkoutPageProps): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkoutById(Number(id));

  if (!workout) {
    return { title: "Not Found | FitLog" };
  }

  return {
    title: `${workout.name} | FitLog`,
    description: workout.description,
  };
}

export default async function WorkoutPage({ params }: WorkoutPageProps) {
  const { id } = await params;
  const workout = await getWorkoutById(Number(id));

  if (!workout) {
    notFound();
  }

  const stats = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
      <section className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line lg:aspect-auto lg:h-full">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h1 className="font-heading text-3xl font-bold uppercase leading-tight text-foreground sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-2 text-base leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-bold leading-none text-background"
              >
                {group}
              </span>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-card">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-line px-5 py-3 last:border-b-0"
              >
                <span className="text-xs font-bold uppercase tracking-wide text-muted">
                  {stat.label}
                </span>
                <span className="text-sm text-foreground">{stat.value}</span>
              </div>
            ))}
          </div>

          <h2 className="mt-5 font-heading text-lg font-bold uppercase tracking-wide text-foreground">
            Instructions
          </h2>

          <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px] text-muted">
            {workout.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          <WorkoutActions workoutId={workout.id} />
        </div>
      </section>
    </div>
  );
}