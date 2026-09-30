import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroCta {
  label: string;
  href: string;
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  backgroundImage: string;
  backgroundImageAlt: string;
  primaryCta: HeroCta;
  secondaryCta?: HeroCta;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  backgroundImageAlt,
  primaryCta,
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-background">
      <Image
        src={backgroundImage}
        alt={backgroundImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.85) 100%)",
        }}
      />

      <div className="container-site relative z-10 pb-16 pt-32 md:pb-24">
        <div className="max-w-xl">
          {eyebrow ? (
            <p className="text-xs font-medium tracking-[0.3em] text-primary uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-serif-display text-5xl font-bold text-white lg:text-[5rem] lg:leading-[1.05]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-4 text-lg text-white/80">{subtitle}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-accent-hover">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="text-sm font-medium text-white underline underline-offset-4 transition-colors hover:text-primary"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
