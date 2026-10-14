import { useTranslation } from "react-i18next";

export function BookingButton({ url, className = "" }: { url: string; className?: string }) {
  const { t } = useTranslation();
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-12 items-center justify-center rounded-full bg-navy px-6 font-semibold text-white active:scale-[0.98] ${className}`}
    >
      {t("property.book")}
    </a>
  );
}
