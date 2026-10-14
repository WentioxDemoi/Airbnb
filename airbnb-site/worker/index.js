const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
      ...extraHeaders,
    },
  });
}

function parseIcsDate(line) {
  const separator = line.indexOf(":");
  const match = line.slice(separator + 1).match(/^(\d{4})(\d{2})(\d{2})/);
  if (separator === -1 || !match) throw new Error("Invalid iCalendar date");

  const [, year, month, day] = match;
  const value = `${year}-${month}-${day}`;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error("Invalid iCalendar date");
  }
  return value;
}

function parseIcsCalendar(calendar) {
  const lines = calendar.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const blockedDates = new Set();
  let event = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      if (event) throw new Error("Nested iCalendar event");
      event = [];
      continue;
    }
    if (line === "END:VEVENT") {
      if (!event) throw new Error("Unexpected iCalendar event end");
      const cancelled = event.some((item) => /^STATUS:CANCELLED$/i.test(item));
      const transparent = event.some((item) => /^TRANSP:TRANSPARENT$/i.test(item));

      if (!cancelled && !transparent) {
        if (event.some((item) => /^RRULE:/i.test(item))) {
          throw new Error("Recurring iCalendar events are not supported");
        }

        const startLine = event.find((item) => /^DTSTART(?:;[^:]*)?:/i.test(item));
        const endLine = event.find((item) => /^DTEND(?:;[^:]*)?:/i.test(item));
        if (!startLine || !endLine) throw new Error("Incomplete iCalendar event");

        const start = parseIcsDate(startLine);
        const end = parseIcsDate(endLine);
        if (end <= start) throw new Error("Invalid iCalendar event range");

        for (
          let date = new Date(`${start}T00:00:00.000Z`);
          date.toISOString().slice(0, 10) < end;
          date.setUTCDate(date.getUTCDate() + 1)
        ) {
          blockedDates.add(date.toISOString().slice(0, 10));
        }
      }

      event = null;
      continue;
    }
    if (event) event.push(line);
  }

  if (event) throw new Error("Unclosed iCalendar event");
  return [...blockedDates].sort();
}

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    if (url.pathname !== "/availability") return jsonResponse({ error: "Not found" }, 404);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, OPTIONS" });
    }
    const feedUrlValue =
      (env.AIRBNB_ICAL_SECRET_NAME && env[env.AIRBNB_ICAL_SECRET_NAME]) ||
      env.AIRBNB_ICAL_URL;
    if (!feedUrlValue) {
      return jsonResponse({ error: "Availability feed is not configured" }, 503);
    }

    const cacheKey = new Request(`${url.origin}/__availability_cache`);
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;

    try {
      const feedUrl = new URL(feedUrlValue);
      if (feedUrl.protocol !== "https:") throw new Error("The iCalendar feed must use HTTPS");

      const feedResponse = await fetch(feedUrl, {
        headers: { Accept: "text/calendar, text/plain;q=0.9" },
      });
      if (!feedResponse.ok) throw new Error("The iCalendar feed could not be fetched");

      const calendar = await feedResponse.text();
      if (calendar.length > 2_000_000 || !calendar.includes("BEGIN:VCALENDAR")) {
        throw new Error("Invalid iCalendar feed");
      }

      const response = jsonResponse(
        { blockedDates: parseIcsCalendar(calendar) },
        200,
        { "Cache-Control": "public, max-age=600" },
      );
      context.waitUntil(caches.default.put(cacheKey, response.clone()));
      return response;
    } catch {
      return jsonResponse(
        { error: "Availability could not be refreshed. Please try again later." },
        502,
        { "Cache-Control": "no-store" },
      );
    }
  },
};
