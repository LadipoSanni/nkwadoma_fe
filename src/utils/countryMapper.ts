import { countries } from "countries-list";

/**
 * Maps a country code (ISO 3166-1 alpha-2) to the enum format expected by the API.
 * @param countryCode - The ISO 3166-1 alpha-2 country code (e.g., "US", "GB").
 * @returns The country name in the enum format (e.g., "UNITED_STATES") or the original code if not found.
 */
export const mapCountryToEnum = (countryCode?: string): string | undefined => {
  if (!countryCode) return undefined;

  const countryName = countries[countryCode as keyof typeof countries]?.name;
  if (!countryName) return countryCode;

  return countryName
    .toUpperCase()
    .replace(/[\s,.()&-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .replace(/'/g, '');
};
