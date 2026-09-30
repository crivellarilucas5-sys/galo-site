import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Nível semântico do título — default h2 (Home/páginas internas usam h2 sob o h1 da rota). */
  level?: "h2" | "h3";
  /**
   * `true` quando a seção pai usa `section-light` (fundo claro, `#fff`).
   * Troca `text-foreground`/`text-muted-foreground` (brancos, pensados para
   * fundo escuro) por `text-fg-on-light`/`text-fg-on-light-muted` — sem essa
   * flag, o `<h2>` herda cor branca sobre fundo branco (QA C1).
   */
  onLight?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = "h2",
  onLight = false,
  className,
}: SectionHeadingProps) {
  const Heading = level;

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary-foreground uppercase">
          {eyebrow}
        </span>
      ) : null}
      <Heading
        className={cn(
          "mt-2 font-display text-3xl font-semibold tracking-wide uppercase lg:text-4xl",
          onLight ? "text-fg-on-light" : "text-foreground",
        )}
      >
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base lg:text-lg",
            onLight ? "text-fg-on-light-muted" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
