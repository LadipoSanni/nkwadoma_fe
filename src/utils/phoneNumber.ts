import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

export const formatInternationalNumber = (
  phoneNumber: string,
  countryCode: string
): string | null => {
  if (!countryCode || !phoneNumber) return null;
  try {
    const parsed = parsePhoneNumberFromString(phoneNumber, countryCode as CountryCode);
    return parsed?.isValid() ? parsed.formatInternational() : null;
  } catch {
    return null;
  }
};