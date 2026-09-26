"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { usePlan } from "@/lib/plan-context";

const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

type BadgeLinkProps = {
  href: string;
  label: string;
  count: number;
  accent: boolean;
};

function BadgeLink({ href, label, count, accent }: BadgeLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-surface ${
        accent ? "text-foreground" : "text-muted"
      }`}
    >
      {label}
      <span
        className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
          accent
            ? "bg-accent text-background"
            : "border border-foreground text-foreground"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-x-4 px-4 py-4 sm:gap-x-6 sm:px-8 sm:py-5 lg:px-12">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
          <Dumbbell size={26} strokeWidth={2.5} className="shrink-0 text-accent" />
          <span className="font-heading text-base font-bold uppercase tracking-widest text-foreground sm:text-xl">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15"
                  : "rounded-full px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <BadgeLink href="/my-plan" label="Plan" count={planCount} accent />
          <BadgeLink
            href="/my-plan?tab=saved"
            label="Saved"
            count={savedCount}
            accent={false}
          />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-accent transition-colors hover:bg-surface sm:hidden"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full border-b border-line bg-background px-4 py-4 shadow-2xl sm:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className={
                  isActive("/")
                    ? "rounded-xl bg-accent/10 px-4 py-3 text-base font-semibold text-accent"
                    : "rounded-xl px-4 py-3 text-base font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
                }
              >
                Workout
              </Link>
              <div
                className={`flex items-center gap-2 rounded-xl ${
                  isActive("/my-plan") ? "bg-accent/10" : ""
                }`}
              >
                <Link
                  href="/my-plan"
                  onClick={() => setMenuOpen(false)}
                  className={
                    isActive("/my-plan")
                      ? "flex-1 rounded-xl px-4 py-3 text-base font-semibold text-accent"
                      : "flex-1 rounded-xl px-4 py-3 text-base font-semibold text-muted transition-colors hover:bg-surface hover:text-foreground"
                  }
                >
                  My Plan
                </Link>
                <BadgeLink href="/my-plan" label="Plan" count={planCount} accent />
                <BadgeLink
                  href="/my-plan?tab=saved"
                  label="Saved"
                  count={savedCount}
                  accent={false}
                />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
