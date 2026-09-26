import Image from "next/image";
import HeroCta from "@/components/HeroCta";

export default function Hero() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-8 sm:px-8 lg:px-12 lg:py-12">
      <section className="flex flex-col items-center gap-12 rounded-3xl bg-card px-6 py-8 sm:px-10 sm:py-10 lg:flex-row lg:justify-between lg:py-12 lg:pl-20 lg:pr-14">
        <div className="max-w-xl text-center lg:text-left">
          <p className="mb-4 text-[13px] font-semibold uppercase tracking-widest text-accent sm:text-sm">
            Workout Library
          </p>
          <h1 className="font-heading text-4xl font-bold uppercase leading-tight sm:text-5xl lg:text-6xl">
            <span className="block">Train with intent.</span>
            <span className="block">Log every set.</span>
          </h1>
          <p className="mt-5 text-[15px] leading-relaxed text-muted sm:text-base sm:leading-relaxed lg:text-lg">
            <span className="block">
              FitLog is a dark, no-nonsense gym companion:
            </span>
            <span>
              pick a lift, lock it into today&apos;s plan, and watch the
              week&apos;s work add up.
            </span>
          </p>
          <HeroCta />
        </div>
        <Image
          src="/hero.png"
          alt="FitLog hero artwork"
          width={334}
          height={334}
          priority
          className="w-full max-w-md sm:max-w-lg lg:-mr-20 lg:max-w-xl"
        />
      </section>
    </div>
  );
}
