import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PropertyDetail } from "../components/PropertyDetail";
import { getPropertyName, properties } from "../data/properties";
import type { LangCode } from "../i18n";

export default function PropertyPage() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const language = (i18n.resolvedLanguage ?? "en") as LangCode;
  const property = properties.find((p) => p.id === id);

  return (
    <main className="pt-2">
      <Link to="/" className="inline-flex h-11 items-center">
        {t("nav.back")}
      </Link>
      {!property && <p className="mt-4">{t("property.notFound")}</p>}
      {property && !property.detail && (
        <>
          <h1 className="mt-4 font-display text-4xl">{getPropertyName(property, language)}</h1>
          <p className="mt-2 opacity-75">{t("property.soon")}</p>
        </>
      )}
      {property?.detail && <PropertyDetail property={property} detail={property.detail} />}
    </main>
  );
}
