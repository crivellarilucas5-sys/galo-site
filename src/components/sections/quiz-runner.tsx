"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import Link from "next/link";
import { Check, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { getResultTier, scoreQuiz } from "@/lib/quiz";
import type { QuizOptionId, QuizQuestion, QuizResultTier } from "@/types/content";

interface QuizRunnerProps {
  questions: QuizQuestion[];
  tiers: QuizResultTier[];
}

const CATEGORY_LABEL: Record<QuizQuestion["category"], string> = {
  historia: "História",
  titulos: "Títulos",
  curiosidades: "Curiosidades",
};

interface QuizState {
  index: number;
  selected: QuizOptionId | null;
  confirmed: boolean;
  answers: Partial<Record<string, QuizOptionId>>;
  showMissingSelectionError: boolean;
  finished: boolean;
}

type QuizAction =
  | { type: "select"; optionId: QuizOptionId }
  | { type: "confirm"; questionId: string }
  | { type: "next"; isLast: boolean }
  | { type: "reset" };

const initialState: QuizState = {
  index: 0,
  selected: null,
  confirmed: false,
  answers: {},
  showMissingSelectionError: false,
  finished: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "select":
      if (state.confirmed) return state;
      return { ...state, selected: action.optionId, showMissingSelectionError: false };
    case "confirm": {
      if (state.confirmed) return state;
      if (!state.selected) return { ...state, showMissingSelectionError: true };
      return {
        ...state,
        confirmed: true,
        answers: { ...state.answers, [action.questionId]: state.selected },
      };
    }
    case "next": {
      if (action.isLast) {
        return { ...state, finished: true };
      }
      return {
        ...state,
        index: state.index + 1,
        selected: null,
        confirmed: false,
        showMissingSelectionError: false,
      };
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export function QuizRunner({ questions, tiers }: QuizRunnerProps) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);
  const prevConfirmed = useRef(false);
  const prevIndex = useRef(0);
  const prevFinished = useRef(false);

  // Região `aria-live` única e persistente (existe em todo o ciclo de vida do
  // componente, nunca é criada junto com o conteúdo que anuncia — M2/M3 do
  // laudo QA: anunciar no mesmo commit em que o nó aparece não é confiável).
  const [announcement, setAnnouncement] = useState("");

  const total = questions.length;
  const question = questions[state.index];
  const isLast = state.index === total - 1;
  const score = scoreQuiz(questions, state.answers);
  const tier = getResultTier(score, total, tiers);

  const handleSelect = useCallback((optionId: QuizOptionId) => {
    dispatch({ type: "select", optionId });
  }, []);

  const handleConfirm = useCallback(() => {
    dispatch({ type: "confirm", questionId: question.id });
  }, [question.id]);

  const handleNext = useCallback(() => {
    dispatch({ type: "next", isLast });
  }, [isLast]);

  // Foco: ao confirmar → botão Próxima/Ver resultado (AC9).
  useEffect(() => {
    if (state.confirmed && !prevConfirmed.current) {
      nextButtonRef.current?.focus();
    }
    prevConfirmed.current = state.confirmed;
  }, [state.confirmed]);

  // Foco: ao avançar pergunta → enunciado da nova pergunta (AC9). A troca de
  // pergunta também é anunciada pela região live persistente (M3).
  useEffect(() => {
    if (state.index !== prevIndex.current) {
      questionHeadingRef.current?.focus();
      setAnnouncement(`Pergunta ${state.index + 1} de ${total}.`);
    }
    prevIndex.current = state.index;
  }, [state.index, total]);

  // Foco: ao chegar na tela de resultado → heading do resultado (AC9). O
  // placar e a faixa são anunciados pela região live persistente (M2), com o
  // texto "de" (não "/") para não ser lido como "barra".
  useEffect(() => {
    if (state.finished && !prevFinished.current) {
      resultHeadingRef.current?.focus();
      setAnnouncement(`Resultado: ${score} de ${total}. ${tier.title}.`);
    }
    prevFinished.current = state.finished;
  }, [state.finished, score, total, tier.title]);

  const liveRegion = (
    <div aria-live="polite" aria-atomic="true" className="sr-only">
      {announcement}
    </div>
  );

  if (state.finished) {
    const percent = total > 0 ? (score / total) * 100 : 0;
    const filledStars = starsForPercent(percent);

    return (
      <div className="mx-auto max-w-2xl text-center">
        {liveRegion}
        <div aria-hidden="true" className="flex items-center justify-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                "size-8",
                i < filledStars ? "fill-primary text-primary" : "text-border",
              )}
            />
          ))}
        </div>

        <p className="mt-4 font-display text-5xl font-bold text-foreground lg:text-6xl">
          {score} / {total}
        </p>

        <h2
          ref={resultHeadingRef}
          tabIndex={-1}
          className="mt-4 font-display text-2xl font-semibold tracking-wide text-foreground uppercase lg:text-3xl"
        >
          {tier.title}
        </h2>

        <p className="mt-3 text-base text-muted-foreground lg:text-lg">{tier.message}</p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <Button type="button" size="lg" onClick={() => dispatch({ type: "reset" })}>
            Refazer o quiz
          </Button>
          <div className="flex gap-6 text-sm">
            <Link
              href="/historia"
              className="text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-accent-hover"
            >
              Ver História
            </Link>
            <Link
              href="/titulos"
              className="text-foreground underline decoration-primary decoration-2 underline-offset-4 hover:decoration-accent-hover"
            >
              Ver Títulos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const correctOption = question.options.find((o) => o.id === question.correctOptionId);
  const isCorrect = state.selected === question.correctOptionId;

  return (
    <div className="mx-auto max-w-2xl">
      {liveRegion}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Pergunta {state.index + 1} de {total}
        </p>
        <Badge variant="outline" className="border-border text-muted-foreground">
          {CATEGORY_LABEL[question.category]}
        </Badge>
      </div>

      <div
        role="progressbar"
        aria-valuenow={state.index + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Pergunta ${state.index + 1} de ${total}`}
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out motion-reduce:transition-none"
          style={{ width: `${((state.index + 1) / total) * 100}%` }}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!state.confirmed) {
            handleConfirm();
          }
        }}
        className="mt-6"
      >
        <fieldset
          aria-describedby={state.showMissingSelectionError ? "quiz-missing-selection" : undefined}
        >
          <legend className="contents">
            <h2
              ref={questionHeadingRef}
              tabIndex={-1}
              className="font-display text-2xl font-semibold text-foreground lg:text-3xl"
            >
              {question.prompt}
            </h2>
          </legend>

          <div className="mt-6 flex flex-col gap-3">
            {question.options.map((option) => {
              const isSelected = state.selected === option.id;
              const isTheCorrectOne = state.confirmed && option.id === question.correctOptionId;
              const isWrongSelected = state.confirmed && isSelected && !isCorrect;
              const isDimmed = state.confirmed && !isTheCorrectOne && !isWrongSelected;

              return (
                <label
                  key={option.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border-2 bg-surface p-4 transition-all duration-150 ease-out",
                    !state.confirmed &&
                      "border-border hover:border-primary/40 hover:-translate-y-0.5 focus-within:border-ring",
                    isTheCorrectOne && "border-primary bg-surface-raised",
                    isWrongSelected && "border-error bg-error-bg",
                    isDimmed && "border-border opacity-60",
                    state.confirmed && "cursor-default",
                  )}
                >
                  <input
                    type="radio"
                    name={`quiz-${question.id}`}
                    value={option.id}
                    checked={isSelected}
                    disabled={state.confirmed}
                    aria-disabled={state.confirmed}
                    onChange={() => handleSelect(option.id)}
                    className="size-4 shrink-0 accent-[var(--color-primary)]"
                  />
                  {isTheCorrectOne && (
                    <Check aria-hidden="true" className="size-4 shrink-0 text-primary" />
                  )}
                  {isWrongSelected && <X aria-hidden="true" className="size-4 shrink-0 text-error" />}
                  <span className="text-base text-foreground">
                    <span aria-hidden="true" className="mr-2 text-primary">
                      {option.id.toUpperCase()})
                    </span>
                    {option.label}
                  </span>
                </label>
              );
            })}
          </div>

          {state.showMissingSelectionError && (
            <p id="quiz-missing-selection" role="alert" className="mt-3 text-sm text-foreground">
              Escolha uma alternativa
            </p>
          )}
        </fieldset>

        <div aria-live="polite" ref={liveRegionRef} className="mt-4 min-h-6 text-base text-foreground">
          {state.confirmed &&
            (isCorrect ? (
              <p>
                <Check aria-hidden="true" className="mr-1 inline size-4 text-primary" />
                Acertou! {question.explanation}
              </p>
            ) : (
              <p>
                <X aria-hidden="true" className="mr-1 inline size-4 text-error" />
                Não foi dessa vez — a resposta certa é {correctOption?.label}. {question.explanation}
              </p>
            ))}
        </div>

        <div className="mt-6">
          {!state.confirmed ? (
            <Button type="submit">Confirmar</Button>
          ) : (
            <Button type="button" ref={nextButtonRef} onClick={handleNext}>
              {isLast ? "Ver resultado" : "Próxima pergunta"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function starsForPercent(percent: number): number {
  if (percent >= 90) return 5;
  if (percent >= 70) return 4;
  if (percent >= 50) return 3;
  if (percent >= 30) return 2;
  return 1;
}
