import type { Metadata } from "next";
import { connection } from "next/server";
import { getWorkouts } from "@/lib/api";
import MyPlan from "@/components/MyPlan";

export const metadata: Metadata = {
  title: "My Plan",
  description: "Review today's plan and workouts saved for later.",
};

export default async function MyPlanPage() {
  await connection();

  const workouts = await getWorkouts();

  return <MyPlan workouts={workouts} />;
}