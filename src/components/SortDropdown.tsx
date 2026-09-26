"use client";

import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleMouseDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="flex items-center gap-2">
      <span className="text-sm text-muted">
        <span className="sm:hidden">Sort</span>
        <span className="hidden sm:inline">Sort By</span>
      </span>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          className="flex w-28 items-center justify-between gap-2 rounded-lg border border-line bg-surface py-2 pl-4 pr-3 text-sm text-foreground transition-colors outline-none hover:bg-card focus:border-accent"
        >
          {selected.label}
          <ChevronDown
            size={18}
            strokeWidth={2.5}
            className={`text-muted transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        {open && (
          <ul className="absolute right-0 z-50 mt-2 min-w-44 overflow-hidden rounded-xl border border-line bg-card p-1.5 shadow-2xl">
            {options.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  aria-pressed={option.value === value}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3.5 py-2.5 text-left text-sm transition-colors ${
                    option.value === value
                      ? "bg-accent/10 text-accent"
                      : "text-foreground hover:bg-surface"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
