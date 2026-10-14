import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "motion/react";
import { BASE } from "../config";

interface GalleryProps {
  propertyId: string;
  name: string;
  photos: string[];
}

// Défilement au doigt (scroll-snap) ; flèches visibles à partir de la tablette.
export function Gallery({ propertyId, name, photos }: GalleryProps) {
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const total = photos.length;

  const onScroll = () => {
    const el = trackRef.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (target: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(total - 1, target));
    el.scrollTo({ left: next * el.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  const arrow =
    "absolute top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 shadow ring-1 ring-navy/10 backdrop-blur disabled:opacity-40 md:flex";

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={name}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-3xl bg-navy/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((file, i) => (
          <div key={file} className="aspect-[4/3] w-full shrink-0 snap-center md:aspect-[16/9]">
            <img
              src={`${BASE}photos/${propertyId}/${file}`}
              alt={t("property.photoAlt", { name, n: i + 1, total })}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              onError={(e) => (e.currentTarget.style.visibility = "hidden")}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      {total > 1 && (
        <>
          <span
            className="absolute bottom-3 right-3 rounded-full bg-navy/70 px-3 py-1 text-sm text-white"
            aria-hidden="true"
          >
            {index + 1} / {total}
          </span>
          <button
            type="button"
            className={`${arrow} left-3`}
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            aria-label={t("property.prevPhoto")}
          >
            <svg viewBox="0 0 8 12" className="h-3 w-2" aria-hidden="true">
              <path d="M6.5 1L1.5 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            className={`${arrow} right-3`}
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            aria-label={t("property.nextPhoto")}
          >
            <svg viewBox="0 0 8 12" className="h-3 w-2" aria-hidden="true">
              <path d="M1.5 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
