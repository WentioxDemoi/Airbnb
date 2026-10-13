import type { LangCode } from "../i18n";

// Drapeaux en SVG : les emojis drapeaux ne s'affichent pas sous Windows.
export function Flag({ code, className = "h-5 w-[30px]" }: { code: LangCode; className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`shrink-0 rounded-[3px] ring-1 ring-navy/15 ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {code === "fr" && (
        <>
          <rect width="10" height="20" fill="#0055a4" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ef4135" />
        </>
      )}
      {code === "it" && (
        <>
          <rect width="10" height="20" fill="#009246" />
          <rect x="10" width="10" height="20" fill="#fff" />
          <rect x="20" width="10" height="20" fill="#ce2b37" />
        </>
      )}
      {code === "de" && (
        <>
          <rect width="30" height="7" fill="#000" />
          <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
          <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
        </>
      )}
      {code === "es" && (
        <>
          <rect width="30" height="20" fill="#aa151b" />
          <rect y="5" width="30" height="10" fill="#f1bf00" />
        </>
      )}
      {code === "en" && (
        <>
          <clipPath id="flag-en-clip">
            <rect width="30" height="20" />
          </clipPath>
          <rect width="30" height="20" fill="#012169" />
          <g clipPath="url(#flag-en-clip)">
            <path d="M0 0L30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
            <path d="M0 0L30 20M30 0L0 20" stroke="#c8102e" strokeWidth="1.6" />
          </g>
          <path d="M15 0V20M0 10H30" stroke="#fff" strokeWidth="6" />
          <path d="M15 0V20M0 10H30" stroke="#c8102e" strokeWidth="3.6" />
        </>
      )}
    </svg>
  );
}
