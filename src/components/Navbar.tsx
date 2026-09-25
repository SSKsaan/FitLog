"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/lib/plan-context";

const navLinks = [
  { label: "Workout", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2.5 px-4 py-4 sm:gap-x-6 sm:px-8 sm:py-5 lg:px-12">
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5">
          <Image src="/logo.png" alt="" width={28} height={28} />
          <span className="font-heading text-base font-bold uppercase tracking-widest text-foreground sm:text-xl">
            FitLog
          </span>
        </Link>

        <nav className="flex gap-1.5 sm:gap-2">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "rounded-full bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/15 sm:px-4 sm:py-1.5 sm:text-sm"
                    : "rounded-full px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:bg-surface hover:text-foreground sm:px-4 sm:py-1.5 sm:text-sm"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-surface sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-background sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-muted transition-colors hover:bg-surface sm:gap-2 sm:px-3 sm:py-1.5 sm:text-sm"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-foreground px-1 text-[10px] font-bold text-foreground sm:h-6 sm:min-w-6 sm:px-1.5 sm:text-xs">
              {savedCount}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}