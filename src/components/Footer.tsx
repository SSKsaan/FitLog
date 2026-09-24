import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row sm:px-8 sm:py-10 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="" width={24} height={24} />
          <span className="font-heading text-base font-bold uppercase tracking-widest text-foreground">
            FitLog
          </span>
        </Link>
        <p className="text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}