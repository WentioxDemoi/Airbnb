import { useState } from "react";
import { BASE, SITE_NAME } from "../config";

// Dépose ton logo dans public/logo.png. Sans fichier, le nom du site s'affiche.
export function Logo({ className = "h-28 w-auto sm:h-36" }: { className?: string }) {
  const [missing, setMissing] = useState(false);
  if (missing) return <span className="font-display text-4xl">{SITE_NAME}</span>;
  return <img src={`${BASE}logo.png`} alt={SITE_NAME} className={className} onError={() => setMissing(true)} />;
}
