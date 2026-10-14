import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AmenityList } from "./AmenityList";
import { BookingCalendar } from "./BookingCalendar";
import { Gallery } from "./Gallery";
import { SITE_NAME } from "../config";
import type { LangCode } from "../i18n";
import type { Property, PropertyDetail as Detail } from "../data/properties";

// Fiche d'un bien : entièrement pilotée par les données de properties.ts.
export function PropertyDetail({ property, detail }: { property: Property; detail: Detail }) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage ?? "en") as LangCode;
  const text = detail.content[lang] ?? detail.content.en;
  const { facts, location } = detail;

  useEffect(() => {
    document.title = `${text.title} – ${SITE_NAME}`;
    return () => {
      document.title = SITE_NAME;
    };
  }, [text.title]);

  const chips = [
    t("property.guests", { count: facts.guests }),
    t("property.bedrooms", { count: facts.bedrooms }),
    t("property.beds", { count: facts.beds }),
    t("property.bathrooms", { count: facts.bathrooms }),
    ...(facts.areaM2 ? [t("property.area", { count: facts.areaM2 })] : []),
  ];

  // Carte centrée sur le quartier, sans repère.
  const { lat, lng } = location;
  const bbox = [lng - 0.005, lat - 0.003, lng + 0.005, lat + 0.003].join("%2C");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;

  const h2 = "font-display text-2xl";

  return (
    <article className="pb-28 lg:pb-8">
      <Gallery propertyId={property.id} name={text.title} photos={property.photos} />

      <div className="mt-8 lg:grid lg:grid-cols-[1fr_20rem] lg:gap-12">
        <div className="max-w-prose">
          <h1 className="font-display text-3xl sm:text-4xl">{text.title}</h1>
          <p className="mt-1 opacity-70">{property.city}</p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <li key={chip} className="rounded-full bg-white px-3 py-1.5 ring-1 ring-navy/10">
                {chip}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-lg leading-relaxed">{text.summary}</p>

          <section className="mt-10">
            <h2 className={h2}>{t("property.sections.space")}</h2>
            <div className="mt-3 space-y-3 leading-relaxed">
              {text.space.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className={`${h2} mb-3`}>{t("property.sections.amenities")}</h2>
            <AmenityList amenities={detail.amenities} />
          </section>

          <section className="mt-10">
            <h2 className={h2}>{t("property.sections.goodToKnow")}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed marker:text-gold">
              {text.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className={h2}>{t("property.sections.location")}</h2>
            <p className="mt-3 leading-relaxed">{text.neighborhood}</p>
            <iframe
              src={mapSrc}
              title={t("property.mapTitle")}
              loading="lazy"
              className="mt-4 aspect-[4/3] w-full rounded-3xl border-0 bg-navy/10"
            />
            <p className="mt-2 text-sm opacity-70">{t("property.mapNote")}</p>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-3xl bg-white p-6 ring-1 ring-navy/10">
            <p className="font-display text-2xl">{property.name}</p>
            <p className="mb-5 opacity-70">{property.city}</p>
            <BookingCalendar
              propertyName={text.title}
              blockedDates={detail.booking.blockedDates}
            />
          </div>
        </aside>
      </div>

      <div
        className="fixed inset-x-0 bottom-0 z-10 border-t border-navy/10 bg-mist/90 px-5 pt-3 backdrop-blur lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <BookingCalendar
          propertyName={text.title}
          blockedDates={detail.booking.blockedDates}
        />
      </div>
    </article>
  );
}
