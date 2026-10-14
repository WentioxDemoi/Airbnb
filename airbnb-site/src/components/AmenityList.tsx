import { useState } from "react";
import { useTranslation } from "react-i18next";

const INITIAL_COUNT = 8;

export function AmenityList({ amenities }: { amenities: string[] }) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? amenities : amenities.slice(0, INITIAL_COUNT);

  return (
    <>
      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {visible.map((id) => (
          <li key={id} className="flex items-center gap-3">
            <svg viewBox="0 0 12 10" className="h-3 w-3 shrink-0 text-gold" aria-hidden="true">
              <path d="M1 5.5l3.2 3L11 1.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t(`amenities.${id}`, { defaultValue: id })}
          </li>
        ))}
      </ul>
      {amenities.length > INITIAL_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll((s) => !s)}
          aria-expanded={showAll}
          className="mt-4 h-11 rounded-full px-5 font-semibold ring-1 ring-navy/25 active:bg-white"
        >
          {showAll ? t("property.showLess") : t("property.showAll", { count: amenities.length })}
        </button>
      )}
    </>
  );
}
