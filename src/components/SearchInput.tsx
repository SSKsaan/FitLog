"use client";

import { Search, X } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search name or tag",
}: SearchInputProps) {
  return (
    <div className="relative min-w-0 flex-1 sm:w-48 sm:flex-none">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className={`w-full rounded-lg border border-line bg-surface py-2 pl-8 text-sm text-foreground outline-none transition-colors placeholder:text-muted hover:bg-card focus:border-accent ${
          value ? "pr-8" : "pr-2"
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted transition-colors hover:text-foreground"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}