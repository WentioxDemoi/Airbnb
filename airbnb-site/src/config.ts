export const SITE_NAME = "Casa Azur";
export const BASE = import.meta.env.BASE_URL;
export const AVAILABILITY_API_URLS: Record<string, string | undefined> = {
  "nice-centre": import.meta.env.VITE_AVAILABILITYNICE_API_URL,
  "roquefort": import.meta.env.VITE_AVAILABILITYROQUEFORT_API_URL,
};
export const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID;
