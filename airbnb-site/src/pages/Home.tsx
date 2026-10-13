import { useTranslation } from "react-i18next";
import { Logo } from "../components/Logo";
import { PropertyCard } from "../components/PropertyCard";
import { properties } from "../data/properties";

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="pb-8 pt-2">
      <section className="flex flex-col items-center text-center">
        <Logo />
        <h1 className="mt-6 font-display text-3xl sm:text-5xl">{t("home.title")}</h1>
        <p className="mt-2 text-lg opacity-75">{t("home.subtitle")}</p>
      </section>
      <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-10">
        {properties.map((p, i) => (
          <PropertyCard key={p.id} property={p} index={i} />
        ))}
      </ul>
    </main>
  );
}
