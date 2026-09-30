import type { Metadata } from "next";
import { QuizRunner } from "@/components/sections/quiz-runner";
import { quizQuestions, quizResultTiers } from "@/content/quiz";
import { assertQuizIntegrity } from "@/lib/quiz";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Quiz",
  description:
    "Teste o que você sabe sobre a história, os títulos e as curiosidades do Atlético Mineiro em 10 perguntas, sem pressão de tempo.",
  path: "/quiz",
});

// Quebra o build (AC4) se o conteúdo de src/content/quiz.ts for inválido —
// ver src/lib/quiz.ts. Roda no escopo do servidor, uma vez, em build time.
assertQuizIntegrity(quizQuestions, quizResultTiers);

export default function QuizPage() {
  return (
    <div className="bg-background py-16 md:py-24 lg:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            Teste seu conhecimento
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-wide text-foreground uppercase lg:text-5xl">
            Quiz do Galo
          </h1>
          <p className="mt-4 text-base text-muted-foreground lg:text-lg">
            10 perguntas sobre a história, os títulos e as curiosidades do Atlético Mineiro. Sem
            timer — responda no seu ritmo e aprenda um pouco mais a cada pergunta.
          </p>
        </div>

        <noscript>
          <p className="mt-8 max-w-2xl rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-foreground">
            O quiz precisa de JavaScript habilitado no navegador para funcionar.
          </p>
        </noscript>

        <div className="mt-12">
          <QuizRunner questions={quizQuestions} tiers={quizResultTiers} />
        </div>
      </div>
    </div>
  );
}
