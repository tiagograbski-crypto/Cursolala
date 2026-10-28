"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";
import { cn } from "@/lib/cn";

const BRAND_LETTERS = "MASTERGLASS".split("");

const LUX_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const T_NAME = 280;
const T_BRAND = 1050;
const T_BRAND_STROKE = 1750;
const T_CTA = 3400;
const EXIT_CTA_MS = 320;
const EXIT_COPY_MS = 420;
const EXIT_VEIL_MS = 880;
const CHAR_STROKE_MS = 70;

let ritualAnchorMs: number | null = null;

function flagsAt(elapsedMs: number) {
  return {
    showName: elapsedMs >= T_NAME,
    showBrand: elapsedMs >= T_BRAND,
    showBrandStroke: elapsedMs >= T_BRAND_STROKE,
    showCta: elapsedMs >= T_CTA,
  };
}

export function Preloader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [showName, setShowName] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [showBrandStroke, setShowBrandStroke] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [exitPhase, setExitPhase] = useState<"idle" | "cta" | "copy" | "veil" | "done">("idle");
  const exitStartedRef = useRef(false);

  const ritualActive = onHome && exitPhase !== "done";
  const blockVitrine =
    onHome && (exitPhase === "idle" || exitPhase === "cta" || exitPhase === "copy");

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (!onHome || exitPhase === "done") {
      root.removeAttribute("data-preloader");
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    if (blockVitrine) {
      root.setAttribute("data-preloader", "open");
    } else {
      root.removeAttribute("data-preloader");
    }
  }, [onHome, exitPhase, blockVitrine]);

  useEffect(() => {
    if (!onHome) {
      ritualAnchorMs = null;
      setShowName(false);
      setShowBrand(false);
      setShowBrandStroke(false);
      setShowCta(false);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setShowName(true);
      setShowBrand(true);
      setShowBrandStroke(true);
      setShowCta(true);
      return;
    }

    if (ritualAnchorMs === null) ritualAnchorMs = Date.now();

    const apply = () => {
      const elapsed = Date.now() - (ritualAnchorMs ?? Date.now());
      const next = flagsAt(elapsed);
      setShowName(next.showName);
      setShowBrand(next.showBrand);
      setShowBrandStroke(next.showBrandStroke);
      setShowCta(next.showCta);
    };

    apply();
    const interval = window.setInterval(apply, 48);
    const stop = window.setTimeout(() => window.clearInterval(interval), T_CTA + 1200);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(stop);
    };
  }, [onHome]);

  const beginExit = useCallback(() => {
    if (exitStartedRef.current || exitPhase !== "idle") return;
    exitStartedRef.current = true;
    window.scrollTo(0, 0);
    setExitPhase("cta");

    window.setTimeout(() => setExitPhase("copy"), EXIT_CTA_MS);
    window.setTimeout(() => setExitPhase("veil"), EXIT_CTA_MS + EXIT_COPY_MS);
    window.setTimeout(() => setExitPhase("done"), EXIT_CTA_MS + EXIT_COPY_MS + EXIT_VEIL_MS);
  }, [exitPhase]);

  if (!ritualActive) return null;

  const hideChrome = exitPhase === "copy" || exitPhase === "veil";
  const hideCta = exitPhase === "cta" || hideChrome;
  const veilExit = exitPhase === "veil";

  return (
    <>
      <div
        className={cn(
          "preloader-root fixed inset-0 z-[100] flex min-h-[100dvh] max-h-[100dvh] flex-col overflow-hidden bg-zinc-950 text-[#fdfbf7]",
          "pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]",
          veilExit && "preloader-exit-veil",
        )}
        aria-busy={exitPhase === "idle" && !showCta}
        aria-label="Abertura Masterglass"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <Image
            src={asset("/images/alaide-ghost.jpg")}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="scale-105 object-cover object-top opacity-30 grayscale mix-blend-overlay animate-pulse [animation-duration:8s] motion-reduce:animate-none"
          />
        </div>
        <div className="relative z-10 flex flex-1 flex-col px-4 pb-24 pt-[min(40vh,18.5rem)] sm:px-6 md:pt-[min(34vh,15.5rem)]">
          <div
            className={cn(
              "mx-auto flex w-full max-w-md flex-col items-center text-center",
              hideChrome && "preloader-exit-copy",
            )}
          >
            <div className="flex w-full flex-col items-center gap-5 md:gap-6">
              <p
                className={cn(
                  "font-serif text-3xl font-medium leading-tight text-[#fdfbf7] transition-opacity duration-[850ms] ease-out md:text-5xl",
                  showName ? "opacity-100" : "opacity-0",
                )}
              >
                Alaíde Proença
              </p>

              <p
                className={cn(
                  "flex max-w-[18rem] flex-wrap justify-center gap-x-[0.38em] font-sans text-[10px] font-medium uppercase leading-relaxed tracking-[0.38em] transition-opacity duration-[850ms] ease-out sm:max-w-none sm:tracking-[0.55em]",
                  showBrand ? "opacity-100" : "opacity-0",
                )}
                aria-label="MASTERGLASS"
                aria-hidden={!showBrand}
              >
                {BRAND_LETTERS.map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className={cn("preloader-brand-char", showBrandStroke && "preloader-brand-char-wave")}
                    style={
                      showBrandStroke ? { animationDelay: `${index * CHAR_STROKE_MS}ms` } : undefined
                    }
                  >
                    {char}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-14 flex min-h-12 w-full max-w-xs items-center justify-center md:mt-9">
              <button
                type="button"
                onClick={beginExit}
                disabled={!showCta}
                className={cn(
                  "preloader-admission-seal min-h-12 w-full rounded-full border border-white/25 bg-white/10 px-6",
                  "font-sans text-[11px] uppercase tracking-[0.16em] text-[#fdfbf7]",
                  "transition-opacity duration-[1100ms] ease-out active:scale-[0.98]",
                  showCta ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                  hideCta && "preloader-exit-cta",
                )}
                style={{ WebkitTextFillColor: "#fdfbf7", color: "#fdfbf7" }}
              >
                Entrar na Imersão
              </button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-20 text-center",
            hideChrome && "preloader-exit-copy",
          )}
        >
          <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">Powered by GL PRO</span>
        </div>
      </div>

      <style>{`
        .preloader-root span,
        .preloader-root p,
        .preloader-root button {
          color: #fdfbf7;
        }

        .preloader-brand-char {
          color: rgb(255 255 255 / 0.22);
          -webkit-text-stroke: 0.6px rgb(255 255 255 / 0.28);
          paint-order: stroke fill;
        }

        @keyframes preloader-brand-char-wave {
          0% {
            color: rgb(255 255 255 / 0.2);
            -webkit-text-stroke-color: rgb(255 255 255 / 0.25);
            filter: brightness(0.85);
          }
          42% {
            color: #fdfbf7;
            -webkit-text-stroke-color: rgb(255 255 255 / 0.95);
            filter: brightness(1.35);
            text-shadow: 0 0 14px rgb(255 255 255 / 0.35);
          }
          100% {
            color: rgb(255 255 255 / 0.78);
            -webkit-text-stroke-color: rgb(255 255 255 / 0.45);
            filter: brightness(1);
            text-shadow: 0 0 4px rgb(255 255 255 / 0.08);
          }
        }

        .preloader-brand-char-wave {
          animation: preloader-brand-char-wave 0.62s ${LUX_EASE} forwards;
        }

        @keyframes preloader-exit-cta {
          to {
            opacity: 0;
          }
        }

        .preloader-exit-cta {
          animation: preloader-exit-cta ${EXIT_CTA_MS}ms ${LUX_EASE} forwards;
          pointer-events: none;
        }

        @keyframes preloader-exit-copy {
          to {
            opacity: 0;
          }
        }

        .preloader-exit-copy {
          animation: preloader-exit-copy ${EXIT_COPY_MS}ms ${LUX_EASE} forwards;
        }

        @keyframes preloader-exit-veil {
          to {
            opacity: 0;
          }
        }

        .preloader-exit-veil {
          animation: preloader-exit-veil ${EXIT_VEIL_MS}ms ${LUX_EASE} forwards;
        }
      `}</style>
    </>
  );
}
