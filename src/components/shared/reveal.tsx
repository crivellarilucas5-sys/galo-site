"use client";

import { motion, useAnimation, useInView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";

const ITEM_HIDDEN = { opacity: 0, y: 24 } as const;
const ITEM_VISIBLE = { opacity: 1, y: 0 } as const;

/**
 * `useLayoutEffect` não roda no servidor (React ignora efeitos durante a
 * renderização SSR); usar `useEffect` como substituto ali evita o warning
 * "useLayoutEffect does nothing on the server" sem mudar o comportamento no
 * cliente, onde `window` sempre existe.
 */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Checagem síncrona (não o `useInView` assíncrono da Motion, que só resolve
 * no frame seguinte) de "este elemento já está dentro do viewport agora".
 * Usada só uma vez, no primeiro layout effect depois de montar — nunca no
 * servidor (QA N2).
 */
function isInInitialViewport(el: Element | null): boolean {
  if (!el || typeof window === "undefined") return false;
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  return rect.bottom > 0 && rect.right > 0 && rect.top < viewportHeight && rect.left < viewportWidth;
}

interface RevealProps {
  children: ReactNode;
  /** Atraso do stagger, em segundos (ex.: 0.1, 0.2). */
  delay?: number;
  className?: string;
  as?: "div" | "li";
}

/**
 * Wrapper de entrada por scroll (`whileInView`) para um elemento isolado —
 * anima uma única vez e respeita `prefers-reduced-motion` (design-direction
 * §5 / story 1.4 AC7). Para listas/grids, prefira `RevealGroup` +
 * `RevealItem`: um único observer orquestra o stagger de todos os itens,
 * em vez de um observer por item (melhor para TBT em grids grandes).
 *
 * **SSR-safe por design (QA H3) e sem flash na hidratação (QA N2):** o estado
 * "oculto" nunca é serializado no HTML do servidor. `animate` é controlado
 * via `useAnimation()` (imperativo); o conteúdo nasce visível (sem
 * `opacity:0` inline). No primeiro `useLayoutEffect` do cliente, o elemento
 * só é escondido se **ainda não estiver dentro do viewport** (checagem
 * síncrona via `getBoundingClientRect`, não o `useInView` assíncrono) — ou
 * seja, conteúdo acima da dobra que o browser já pintou a partir do HTML do
 * servidor nunca é ocultado (nunca "pisca"), e só o que está abaixo da
 * dobra entra oculto para animar normalmente quando o usuário rolar até ele.
 * Sem JS (ou com `prefers-reduced-motion`), o conteúdo permanece sempre
 * visível.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const active = !shouldReduceMotion;
  const ref = useRef<HTMLLIElement & HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const revealedOnMount = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (!active) return;
    if (isInInitialViewport(ref.current)) {
      // Já visível para o usuário no HTML pintado pelo servidor — esconder
      // agora causaria o flash que o QA reportou (N2). Nasce "já revelado".
      revealedOnMount.current = true;
      return;
    }
    controls.set(ITEM_HIDDEN);
  }, [active, controls]);

  useEffect(() => {
    if (revealedOnMount.current) return;
    if (!inView) return;
    void controls.start({
      ...ITEM_VISIBLE,
      transition: { duration: active ? 0.5 : 0, ease: "easeOut", delay: active ? delay : 0 },
    });
  }, [inView, controls, active, delay]);

  if (as === "li") {
    return (
      <motion.li ref={ref} className={className} animate={controls}>
        {children}
      </motion.li>
    );
  }

  return (
    <motion.div ref={ref} className={className} animate={controls}>
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: "ul" | "ol" | "div";
  /** Intervalo de stagger entre `RevealItem` filhos, em segundos. */
  staggerDelay?: number;
}

/**
 * Container de stagger para grids/listas — registra um único
 * `IntersectionObserver` (via `useInView`) e propaga a animação para os
 * `RevealItem` filhos via variants nomeadas ("hidden"/"visible"). Reduz
 * drasticamente o número de observers em relação a um `<Reveal>` por item.
 *
 * SSR-safe pelo mesmo mecanismo do `Reveal` (ver doc acima) e com a mesma
 * proteção contra flash na hidratação (QA N2): a variant "hidden" só é
 * aplicada via `controls.set("hidden")` depois de montar no cliente, **e só
 * quando o grupo ainda não está dentro do viewport** (checagem síncrona). Um
 * grupo já visível no primeiro viewport (ex.: `/titulos`, `/elenco` — sem
 * hero, conteúdo alto na página) nasce revelado, sem animação de entrada;
 * grupos abaixo da dobra continuam animando ao rolar.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
  staggerDelay = 0.08,
}: RevealGroupProps) {
  const shouldReduceMotion = useReducedMotion();
  const active = !shouldReduceMotion;
  const ref = useRef<HTMLUListElement & HTMLOListElement & HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const revealedOnMount = useRef(false);
  const variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: active ? staggerDelay : 0 },
    },
  };

  useIsomorphicLayoutEffect(() => {
    if (!active) return;
    if (isInInitialViewport(ref.current)) {
      revealedOnMount.current = true;
      return;
    }
    controls.set("hidden");
  }, [active, controls]);

  useEffect(() => {
    if (revealedOnMount.current) return;
    if (!inView) return;
    void controls.start("visible");
  }, [inView, controls]);

  if (as === "ul") {
    return (
      <motion.ul ref={ref} className={className} animate={controls} variants={variants}>
        {children}
      </motion.ul>
    );
  }

  if (as === "ol") {
    return (
      <motion.ol ref={ref} className={className} animate={controls} variants={variants}>
        {children}
      </motion.ol>
    );
  }

  return (
    <motion.div ref={ref} className={className} animate={controls} variants={variants}>
      {children}
    </motion.div>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: "li" | "div";
}

/**
 * Item filho de `RevealGroup` — não registra observer próprio. Não declara
 * `initial`/`animate` própria: herda o estado do `RevealGroup` ancestral
 * (propagação de variants do Motion), então nasce visível no SSR pelo mesmo
 * motivo do pai.
 */
export function RevealItem({ children, className, as = "li" }: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component
      className={className}
      variants={{
        hidden: shouldReduceMotion ? { opacity: 1 } : ITEM_HIDDEN,
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: "easeOut" },
        },
      }}
    >
      {children}
    </Component>
  );
}
