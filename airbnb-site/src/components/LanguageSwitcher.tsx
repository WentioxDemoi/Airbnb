import { useEffect, useId, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { LANGUAGES } from "../i18n";
import { Flag } from "./Flag";

// Composant réutilisable : à placer n'importe où, il lit et change la langue i18next.
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = LANGUAGES.find((l) => l.code === i18n.resolvedLanguage) ?? LANGUAGES[1];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${t("lang.change")} (${current.label})`}
        className="flex h-11 min-w-11 items-center gap-2 rounded-full bg-white/70 px-3 shadow-sm ring-1 ring-navy/10 backdrop-blur active:scale-95"
      >
        <Flag code={current.code} />
        <svg viewBox="0 0 12 8" className="h-2 w-3" aria-hidden="true">
          <path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-2xl bg-white p-1 shadow-lg ring-1 ring-navy/10"
          >
            {LANGUAGES.map(({ code, label }) => (
              <li key={code}>
                <button
                  type="button"
                  lang={code}
                  aria-current={code === current.code}
                  onClick={() => {
                    void i18n.changeLanguage(code);
                    setOpen(false);
                  }}
                  className={`flex h-11 w-full items-center gap-3 rounded-xl px-3 text-left active:bg-mist ${
                    code === current.code ? "bg-mist font-semibold" : ""
                  }`}
                >
                  <Flag code={code} />
                  {label}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
