import type { QuizOptionId, QuizQuestion, QuizResultTier } from "@/types/content";

/**
 * Funções puras do quiz (sem React) — fonte única de cálculo de pontuação e
 * faixa de resultado. Ver docs/smart-memory/stories/active/2.1-pagina-quiz.md.
 */

/** Conta acertos; pergunta sem resposta conta 0. */
export function scoreQuiz(
  questions: QuizQuestion[],
  answers: Partial<Record<string, QuizOptionId>>,
): number {
  return questions.reduce((acertos, question) => {
    const answer = answers[question.id];
    return answer !== undefined && answer === question.correctOptionId ? acertos + 1 : acertos;
  }, 0);
}

/** Faixa de maior `minPercent` tal que `percentual >= minPercent`. */
export function getResultTier(
  score: number,
  total: number,
  tiers: QuizResultTier[],
): QuizResultTier {
  const percent = total > 0 ? (score / total) * 100 : 0;
  const sorted = [...tiers].sort((a, b) => b.minPercent - a.minPercent);
  const tier = sorted.find((t) => percent >= t.minPercent);
  if (!tier) {
    throw new Error("assertQuizIntegrity deveria ter garantido uma faixa com minPercent: 0");
  }
  return tier;
}

const VALID_OPTION_IDS: QuizOptionId[] = ["a", "b", "c", "d"];

/**
 * Valida a integridade do conteúdo do quiz — lança `Error` (quebra o build)
 * se qualquer regra do AC4/AC5 da story 2.1 for violada.
 */
export function assertQuizIntegrity(questions: QuizQuestion[], tiers: QuizResultTier[]): void {
  if (questions.length < 8 || questions.length > 10) {
    throw new Error(
      `assertQuizIntegrity: quizQuestions deve ter entre 8 e 10 perguntas, tem ${questions.length}.`,
    );
  }

  const seenIds = new Set<string>();
  for (const question of questions) {
    if (!question.id) {
      throw new Error("assertQuizIntegrity: pergunta com id vazio.");
    }
    if (seenIds.has(question.id)) {
      throw new Error(`assertQuizIntegrity: id de pergunta duplicado: "${question.id}".`);
    }
    seenIds.add(question.id);

    if (!question.prompt?.trim()) {
      throw new Error(`assertQuizIntegrity: prompt vazio na pergunta "${question.id}".`);
    }
    if (!question.explanation?.trim()) {
      throw new Error(`assertQuizIntegrity: explanation vazia na pergunta "${question.id}".`);
    }
    if (!question.factRef?.trim()) {
      throw new Error(`assertQuizIntegrity: factRef vazio na pergunta "${question.id}".`);
    }

    const optionIds = question.options.map((o) => o.id);
    const sortedOptionIds = [...optionIds].sort();
    const isExactlyABCD = VALID_OPTION_IDS.every((id, index) => sortedOptionIds[index] === id);
    if (question.options.length !== 4 || !isExactlyABCD) {
      throw new Error(
        `assertQuizIntegrity: pergunta "${question.id}" precisa ter exatamente as alternativas a,b,c,d sem repetição.`,
      );
    }

    for (const option of question.options) {
      if (!option.label?.trim()) {
        throw new Error(
          `assertQuizIntegrity: alternativa "${option.id}" da pergunta "${question.id}" tem label vazio.`,
        );
      }
    }

    if (!optionIds.includes(question.correctOptionId)) {
      throw new Error(
        `assertQuizIntegrity: correctOptionId "${question.correctOptionId}" não existe nas alternativas da pergunta "${question.id}".`,
      );
    }
  }

  if (tiers.some((t) => t.minPercent < 0 || t.minPercent > 100)) {
    throw new Error("assertQuizIntegrity: há uma faixa com minPercent fora de 0–100.");
  }

  const minPercents = tiers.map((t) => t.minPercent);
  if (new Set(minPercents).size !== minPercents.length) {
    throw new Error("assertQuizIntegrity: há faixas com minPercent duplicado.");
  }

  if (!minPercents.includes(0)) {
    throw new Error("assertQuizIntegrity: nenhuma faixa tem minPercent: 0 (cobertura incompleta).");
  }

  for (const tier of tiers) {
    if (!tier.title?.trim() || !tier.message?.trim()) {
      throw new Error(`assertQuizIntegrity: faixa com minPercent ${tier.minPercent} tem title/message vazio.`);
    }
  }
}
