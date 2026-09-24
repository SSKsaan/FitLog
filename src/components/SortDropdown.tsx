"use client";

import { ChevronDown } from "lucide-react";

export type SortOption = "duration" | "caloriesBurned" | "rating";

const options: { value: SortOption; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

type SortDropdownProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted">Sort By</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none rounded-lg border border-line bg-surface py-2 pl-4 pr-10 text-sm text-foreground outline-none transition-colors hover:bg-card focus:border-accent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}