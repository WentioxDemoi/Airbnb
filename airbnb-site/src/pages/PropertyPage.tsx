import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { properties } from "../data/properties";

// Page provisoire : la fiche détaillée sera construite ensuite.
export default function PropertyPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const property = properties.find((p) => p.id === id);
  return (
    <main className="py-10">
      <Link to="/" className="inline-flex h-11 items-center">
        {t("nav.back")}
      </Link>
      <h1 className="mt-4 font-display text-4xl">{property?.name}</h1>
      <p className="mt-2 opacity-75">{t("property.soon")}</p>
    </main>
  );
}
