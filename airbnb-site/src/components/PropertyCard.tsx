import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "motion/react";
import { BASE } from "../config";
import type { Property } from "../data/properties";

function PhotoCarousel({ property, index }: { property: Property; index: number }) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const count = property.photos.length;

  useEffect(() => {
    if (reduceMotion || count < 2) return;
    // Décalage par carte pour que les photos ne changent pas toutes en même temps.
    const timer = setInterval(() => setCurrent((c) => (c + 1) % count), 4500 + index * 800);
    return () => clearInterval(timer);
  }, [reduceMotion, count, index]);

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-navy/60">
      {property.photos.map((file, i) => (
        <img
          key={file}
          src={`${BASE}photos/${property.id}/${file}`}
          alt=""
          loading={i === 0 ? "eager" : "lazy"}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {count > 1 && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden="true">
          {property.photos.map((file, i) => (
            <span
              key={file}
              className={`h-1.5 rounded-full bg-white transition-all ${i === current ? "w-5" : "w-1.5 opacity-60"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function PropertyCard({ property, index }: { property: Property; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.12, ease: "easeOut" }}
      className="w-full max-w-sm sm:w-80"
    >
      <Link
        to={`/bien/${property.id}`}
        aria-label={t("home.view", { name: property.name })}
        className="group block active:scale-[0.98]"
      >
        <PhotoCarousel property={property} index={index} />
        <h2 className="mt-4 font-display text-2xl">{property.name}</h2>
        <p className="opacity-70">{property.city}</p>
      </Link>
    </motion.li>
  );
}
