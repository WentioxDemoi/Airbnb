import { useEffect, useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { FORMSPREE_FORM_ID } from "../config";

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function nightsBetween(start: string, end: string) {
  const [startYear, startMonth, startDay] = start.split("-").map(Number);
  const [endYear, endMonth, endDay] = end.split("-").map(Number);
  return (Date.UTC(endYear, endMonth - 1, endDay) - Date.UTC(startYear, startMonth - 1, startDay)) / 86_400_000;
}

function hasBlockedDate(start: string, end: string, blockedDates: Set<string>) {
  for (let date = dateFromKey(start); dateKey(date) < end; date.setDate(date.getDate() + 1)) {
    if (blockedDates.has(dateKey(date))) return true;
  }
  return false;
}

function isAvailabilityResponse(value: unknown): value is { blockedDates: string[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "blockedDates" in value &&
    Array.isArray(value.blockedDates) &&
    value.blockedDates.every((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date))
  );
}

export function BookingCalendar({
  propertyName,
  blockedDates,
  availabilityUrl,
  minNights = 1,
}: {
  propertyName: string;
  blockedDates: string[];
  availabilityUrl?: string;
  minNights?: number;
}) {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? "en";
  const today = dateKey(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState(() => {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  });
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [name, setName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestMessage, setGuestMessage] = useState("");
  const [messageError, setMessageError] = useState(false);
  const [dateError, setDateError] = useState<"unavailable" | "minimum" | null>(null);
  const [airbnbBlockedDates, setAirbnbBlockedDates] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const [availabilityAttempt, setAvailabilityAttempt] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const blocked = new Set([...blockedDates, ...airbnbBlockedDates]);

  useEffect(() => {
    if (!isOpen) return;

    const controller = new AbortController();
    if (!availabilityUrl) return () => controller.abort();

    void fetch(`${availabilityUrl.replace(/\/+$/, "")}/availability`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Availability request failed");
        const result: unknown = await response.json();
        if (!isAvailabilityResponse(result)) throw new Error("Invalid availability response");
        setAirbnbBlockedDates(result.blockedDates);
        setAvailabilityStatus("ready");
      })
      .catch(() => {
        if (!controller.signal.aborted) setAvailabilityStatus("error");
      });

    return () => controller.abort();
  }, [isOpen, availabilityAttempt, availabilityUrl]);

  const monthLabel = new Intl.DateTimeFormat(language, {
    month: "long",
    year: "numeric",
  }).format(month);
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(language, { weekday: "short" }).format(
      new Date(2024, 0, index + 1),
    ),
  );
  const firstWeekday = (month.getDay() + 6) % 7;
  const days = Array.from({ length: 42 }, (_, index) =>
    new Date(month.getFullYear(), month.getMonth(), index - firstWeekday + 1),
  );
  const dateFormatter = new Intl.DateTimeFormat(language, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function chooseDate(value: string) {
    setDateError(null);
    const choosingArrival = !arrival || Boolean(departure);
    if (choosingArrival) {
      if (blocked.has(value)) {
        setDateError("unavailable");
        return;
      }
      setArrival(value);
      setDeparture("");
      setSubmissionStatus("idle");
      return;
    }

    if (value <= arrival) {
      setArrival(value);
      setDeparture("");
      setSubmissionStatus("idle");
      return;
    }

    if (hasBlockedDate(arrival, value, blocked)) {
      setDateError("unavailable");
      return;
    }

    if (nightsBetween(arrival, value) < minNights) {
      setDateError("minimum");
      return;
    }

    setDeparture(value);
    setSubmissionStatus("idle");
  }

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!guestMessage.trim()) {
      setMessageError(true);
      return;
    }
    setMessageError(false);
    if (
      availabilityStatus !== "ready" ||
      !arrival ||
      !departure ||
      hasBlockedDate(arrival, departure, blocked) ||
      !FORMSPREE_FORM_ID
    ) {
      return;
    }

    setSubmissionStatus("sending");
    try {
      const payload = new FormData();
      payload.set("_subject", t("property.booking.emailSubject", { property: propertyName }));
      payload.set("property", propertyName);
      payload.set("name", name);
      payload.set("email", guestEmail);
      payload.set("message", guestMessage.trim());
      payload.set("arrival", arrival);
      payload.set("departure", departure);

      const response = await fetch(
        `https://formspree.io/f/${encodeURIComponent(FORMSPREE_FORM_ID)}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: payload,
        },
      );
      if (!response.ok) throw new Error("Formspree submission failed");
      setSubmissionStatus("success");
    } catch {
      setSubmissionStatus("error");
    }
  }

  function changeMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  function openCalendar() {
    setAvailabilityStatus(availabilityUrl ? "loading" : "error");
    setArrival("");
    setDeparture("");
    setDateError(null);
    setMessageError(false);
    setSubmissionStatus("idle");
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openCalendar}
        className="flex h-12 w-full items-center justify-center rounded-full bg-navy px-6 font-semibold text-white active:scale-[0.98]"
      >
        {t("property.book")}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 sm:items-center sm:p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-mist p-5 shadow-2xl sm:rounded-3xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="booking-title" className="font-display text-2xl">
                  {t("property.booking.title")}
                </h2>
                <p className="mt-2 text-sm opacity-75">{t("property.booking.availabilityNote")}</p>
              </div>
              <button
                type="button"
                aria-label={t("property.booking.close")}
                onClick={() => setIsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl ring-1 ring-navy/10"
              >
                ×
              </button>
            </div>

            {availabilityStatus === "loading" && (
              <p role="status" className="mt-4 text-sm">
                {t("property.booking.availabilityLoading")}
              </p>
            )}
            {availabilityStatus === "error" && (
              <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                <span>{t("property.booking.availabilityError")}</span>
                <button
                  type="button"
                  onClick={() => {
                    setAvailabilityStatus("loading");
                    setAvailabilityAttempt((attempt) => attempt + 1);
                  }}
                  className="font-semibold underline"
                >
                  {t("property.booking.retry")}
                </button>
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-navy/10">
              <div className="flex items-center justify-between gap-4">
                <button
                  type="button"
                  aria-label={t("property.booking.previousMonth")}
                  disabled={
                    dateKey(month) <=
                    dateKey(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
                  }
                  onClick={() => changeMonth(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist disabled:opacity-30"
                >
                  ←
                </button>
                <h3 className="font-semibold capitalize">{monthLabel}</h3>
                <button
                  type="button"
                  aria-label={t("property.booking.nextMonth")}
                  onClick={() => changeMonth(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-mist"
                >
                  →
                </button>
              </div>

              <div className="mt-3 grid grid-cols-7 text-center text-xs font-medium opacity-65">
                {weekdays.map((weekday, index) => (
                  <span key={`${weekday}-${index}`} className="py-2">
                    {weekday}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-7 text-center">
                {days.map((day) => {
                  const value = dateKey(day);
                  const isCurrentMonth = day.getMonth() === month.getMonth();
                  if (!isCurrentMonth) return <span key={value} aria-hidden="true" />;

                  const isBlocked = blocked.has(value);
                  const isPast = value < today;
                  const isSelected = value === arrival || value === departure;
                  const isBetween = Boolean(arrival && departure && value > arrival && value < departure);
                  const choosingArrival = !arrival || Boolean(departure);
                  const disabled =
                    isPast ||
                    availabilityStatus !== "ready" ||
                    (choosingArrival && isBlocked) ||
                    (!choosingArrival &&
                      value > arrival &&
                      nightsBetween(arrival, value) < minNights);

                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={disabled}
                      aria-pressed={isSelected}
                      aria-label={`${dateFormatter.format(day)}${isBlocked ? `, ${t("property.booking.blocked")}` : ""}`}
                      onClick={() => chooseDate(value)}
                      className={`mx-auto my-0.5 flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors ${
                        isSelected
                          ? "bg-navy font-semibold text-white"
                          : isBetween
                            ? "rounded-none bg-mist"
                            : isBlocked
                              ? "text-navy/35 line-through"
                              : "hover:bg-mist"
                      } disabled:cursor-not-allowed`}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs opacity-70">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-white ring-1 ring-navy/30" />
                  {t("property.booking.available")}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-navy/20" />
                  {t("property.booking.blocked")}
                </span>
              </div>
            </div>

            <p aria-live="polite" className="mt-4 min-h-5 text-sm">
              {arrival && departure
                ? `${dateFormatter.format(dateFromKey(arrival))} – ${dateFormatter.format(dateFromKey(departure))}`
                : arrival
                  ? t("property.booking.chooseDeparture")
                  : t("property.booking.chooseArrival")}
            </p>
            {minNights > 1 && (
              <p className="mt-2 text-sm opacity-75">
                {t("property.booking.minimumStay", { count: minNights })}
              </p>
            )}
            {dateError && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-800">
                {t(
                  dateError === "minimum"
                    ? "property.booking.minimumStayError"
                    : "property.booking.dateUnavailable",
                  { count: minNights },
                )}
              </p>
            )}

            {submissionStatus === "success" && (
              <p role="status" className="mt-3 text-sm font-medium">
                {t("property.booking.sendSuccess")}
              </p>
            )}
            {submissionStatus === "error" && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-800">
                {t("property.booking.sendError")}
              </p>
            )}
            {!FORMSPREE_FORM_ID && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-800">
                {t("property.booking.formNotConfigured")}
              </p>
            )}

            <form onSubmit={submitRequest} className="mt-4 space-y-3">
              <label className="block text-sm font-medium">
                {t("property.booking.name")}
                <input
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border-0 bg-white px-4 ring-1 ring-navy/15 focus:ring-2 focus:ring-navy"
                />
              </label>
              <label className="block text-sm font-medium">
                {t("property.booking.guestEmail")}
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={guestEmail}
                  onChange={(event) => setGuestEmail(event.target.value)}
                  className="mt-1 h-12 w-full rounded-xl border-0 bg-white px-4 ring-1 ring-navy/15 focus:ring-2 focus:ring-navy"
                />
              </label>
              <label className="block text-sm font-medium">
                {t("property.booking.message")}
                <textarea
                  required
                  rows={4}
                  maxLength={3000}
                  value={guestMessage}
                  onChange={(event) => {
                    setGuestMessage(event.target.value);
                    if (event.target.value.trim()) setMessageError(false);
                  }}
                  className="mt-1 w-full resize-y rounded-xl border-0 bg-white px-4 py-3 ring-1 ring-navy/15 focus:ring-2 focus:ring-navy"
                />
              </label>
              {messageError && (
                <p role="alert" className="text-sm font-medium text-red-800">
                  {t("property.booking.messageRequired")}
                </p>
              )}
              <button
                type="submit"
                disabled={
                  availabilityStatus !== "ready" ||
                  !arrival ||
                  !departure ||
                  !FORMSPREE_FORM_ID ||
                  submissionStatus === "sending" ||
                  submissionStatus === "success"
                }
                className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-navy px-6 font-semibold text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t(
                  submissionStatus === "sending"
                    ? "property.booking.sending"
                    : "property.booking.sendRequest",
                )}
              </button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
