"use client";

import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Website Developer",
  "Python Developer",
  "Back-end Developer",
  "FFXVI Player",
  "Gamer",
] as const;

/** Width so the line does not grow while typing; keeps leading `A ` from shifting sideways */
const TYPING_LINE_MIN_CH = Math.max(...ROLES.map((r) => r.length)) + 4;

/** Slightly uneven pace, slower around spaces or hyphens, occasional hesitation */
function typingDelay(char: string, prevChar: string | undefined): number {
  let ms = 55 + Math.random() * 95;
  if (char === " " || char === "-") ms += 45 + Math.random() * 120;
  if (prevChar === " " || prevChar === "-") ms += 25 + Math.random() * 60;
  if (Math.random() < 0.12) ms += 120 + Math.random() * 220;
  return Math.round(ms);
}

function deleteDelay(): number {
  return Math.round(22 + Math.random() * 38);
}

function pauseWhenCompleteMs(): number {
  return Math.round(1800 + Math.random() * 900);
}

function pauseBeforeNextPhraseMs(): number {
  return Math.round(280 + Math.random() * 220);
}

export function RotatingDeveloperTitle() {
  const [displayText, setDisplayText] = useState("");
  const displayRef = useRef("");
  const timeoutRef = useRef<ReturnType<typeof globalThis.setTimeout> | null>(
    null,
  );
  const phraseIndexRef = useRef(0);
  const phaseRef = useRef<"typing" | "deleting">("typing");

  const setDisplay = (next: string) => {
    displayRef.current = next;
    setDisplayText(next);
  };

  useEffect(() => {
    let cancelled = false;
    phraseIndexRef.current = 0;
    phaseRef.current = "typing";
    displayRef.current = "";
    setDisplayText("");

    const clearTimer = () => {
      if (timeoutRef.current != null) {
        globalThis.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    const schedule = (fn: () => void, ms: number) => {
      clearTimer();
      timeoutRef.current = globalThis.setTimeout(() => {
        timeoutRef.current = null;
        if (!cancelled) fn();
      }, ms);
    };

    const run = () => {
      if (cancelled) return;

      const phraseIndex = phraseIndexRef.current % ROLES.length;
      const target = ROLES[phraseIndex];
      const current = displayRef.current;

      if (phaseRef.current === "typing") {
        if (current.length < target.length) {
          const i = current.length;
          const char = target.charAt(i);
          const prev = i > 0 ? target[i - 1] : undefined;
          setDisplay(target.slice(0, i + 1));
          schedule(run, typingDelay(char, prev));
          return;
        }
        if (current === target) {
          schedule(() => {
            if (cancelled) return;
            phaseRef.current = "deleting";
            run();
          }, pauseWhenCompleteMs());
          return;
        }
        setDisplay("");
        schedule(run, pauseBeforeNextPhraseMs());
        return;
      }

      if (current.length > 0) {
        setDisplay(current.slice(0, -1));
        schedule(run, deleteDelay());
        return;
      }

      phraseIndexRef.current = (phraseIndexRef.current + 1) % ROLES.length;
      phaseRef.current = "typing";
      schedule(run, pauseBeforeNextPhraseMs());
    };

    schedule(run, 500 + Math.random() * 400);

    return () => {
      cancelled = true;
      clearTimer();
    };
  }, []);

  return (
    <h1 className="flex flex-col items-center gap-2 font-bold text-foreground text-balance">
      <span className="flex flex-wrap items-baseline justify-center gap-x-1.5 px-2 text-center">
        <span className="text-5xl leading-none tracking-tight sm:text-6xl lg:text-9xl">
          Hi
        </span>
        <span className="text-3xl sm:text-4xl lg:text-7xl">
          , I&apos;m Lawrence
        </span>
      </span>
      <span className="flex w-full justify-center px-2 text-4xl sm:text-5xl">
        <span className="text-primary inline-flex min-w-[min(100%,19rem)] max-w-full items-baseline justify-start gap-0.5 sm:min-w-92">
          <span className="text-foreground shrink-0">A&nbsp;</span>
          <span className="text-left">{displayText}</span>
          <span
            className="inline-block h-[0.85em] w-0.5 shrink-0 animate-pulse rounded-sm bg-primary"
            aria-hidden="true"
          />
        </span>
      </span>
    </h1>
  );
}
