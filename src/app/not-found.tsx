import Link from "next/link";
import { Star } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <Star aria-hidden="true" className="size-10 text-primary" />
      <p className="mt-4 font-display text-2xl font-semibold tracking-wide text-primary uppercase">
        Fora de jogo
      </p>
      <h1 className="mt-2 font-display text-5xl font-bold text-foreground uppercase lg:text-6xl">
        Página não encontrada
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        A página que você procura saiu de campo. Volte para a página inicial e continue
        acompanhando o Galo.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent-hover"
      >
        Voltar para o início
      </Link>
    </div>
  );
}
