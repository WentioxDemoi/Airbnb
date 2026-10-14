import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { BASE } from "../config";
import { experiences } from "../data/experiences";
import type { LangCode } from "../i18n";

function imageSourceUrl(file: string) {
  return `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file).replaceAll("%20", "_")}`;
}

export default function ExperiencesSection() {
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "en") as LangCode;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = experiences.find((experience) => experience.id === selectedId);
  const selectedContent = selected?.content[language] ?? selected?.content.en;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selected && dialog && !dialog.open) dialog.showModal();
  }, [selected]);

  return (
    <section className="mt-20 border-t border-navy/10 pt-14 sm:mt-24 sm:pt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
          {t("home.experiences.eyebrow")}
        </p>
        <h2 className="mt-3 font-display text-3xl sm:text-5xl">
          {t("home.experiences.title")}
        </h2>
        <p className="mt-4 text-lg leading-relaxed opacity-75">
          {t("home.experiences.subtitle")}
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {experiences.map((experience) => {
          const content = experience.content[language] ?? experience.content.en;
          return (
            <li key={experience.id}>
              <button
                type="button"
                onClick={() => setSelectedId(experience.id)}
                aria-haspopup="dialog"
                className="group block h-full w-full overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-offset-4"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/10">
                  <img
                    src={`${BASE}${experience.image}`}
                    alt={experience.imageAlt[language]}
                    loading="lazy"
                    decoding="async"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {content.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-sm font-medium opacity-65">{content.location}</p>
                  <h3 className="mt-1 font-display text-xl">{content.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed opacity-75">
                    {content.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                    {t("home.experiences.discover")}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-labelledby="experience-title"
        onClose={() => setSelectedId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
        className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-3xl bg-mist p-0 text-navy shadow-2xl backdrop:bg-navy/60"
      >
        {selected && selectedContent && (
          <article>
            <div className="relative aspect-[16/9] bg-navy/10">
              <img
                src={`${BASE}${selected.image}`}
                alt={selected.imageAlt[language]}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label={t("home.experiences.close")}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-xl shadow"
              >
                ×
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-gold">
                {selectedContent.category}
              </p>
              <h2 id="experience-title" className="mt-2 font-display text-3xl sm:text-4xl">
                {selectedContent.title}
              </h2>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm opacity-75">
                <span>{selectedContent.location}</span>
                <span>{selectedContent.duration}</span>
              </div>
              <p className="mt-5 text-lg leading-relaxed">{selectedContent.summary}</p>
              <ul className="mt-5 list-disc space-y-3 pl-5 leading-relaxed marker:text-gold">
                {selectedContent.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
          </article>
        )}
      </dialog>
    </section>
  );
}
