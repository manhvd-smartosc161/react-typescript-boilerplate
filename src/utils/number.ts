/**
 * Number utility functions for formatting and manipulating numbers
 * Designed to work well with Material-UI components and forms
 */

/**
 * Formats a number with locale-specific formatting (e.g., "1,234,567")
 * @param num - Number to format (number, string, or null/undefined)
 * @param locale - Locale to use for formatting (defaults to 'en-US')
 * @returns Formatted number string or null if invalid
 */
export const formatNumber = (
  num: number | string | null | undefined,
  locale: string = 'en-US',
): string | null => {
  if (num === null || num === undefined) return null;

  try {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return null;

    return number.toLocaleString(locale);
  } catch (error) {
    console.warn('Invalid number format:', num, error);
    return null;
  }
};

/**
 * Formats a number as currency
 * @param num - Number to format
 * @param currency - Currency code (defaults to 'USD')
 * @param locale - Locale to use (defaults to 'en-US')
 * @returns Formatted currency string or null if invalid
 */
export const formatCurrency = (
  num: number | string | null | undefined,
  currency: string = 'USD',
  locale: string = 'en-US',
): string | null => {
  if (num === null || num === undefined) return null;

  try {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return null;

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(number);
  } catch (error) {
    console.warn('Invalid currency format:', num, error);
    return null;
  }
};

/**
 * Formats a number as a percentage
 * @param num - Number to format (0-1 for decimal, or 0-100 for percentage)
 * @param decimals - Number of decimal places (defaults to 1)
 * @param locale - Locale to use (defaults to 'en-US')
 * @returns Formatted percentage string or null if invalid
 */
export const formatPercentage = (
  num: number | string | null | undefined,
  decimals: number = 1,
  locale: string = 'en-US',
): string | null => {
  if (num === null || num === undefined) return null;

  try {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return null;

    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(number / 100); // Convert to decimal for percentage
  } catch (error) {
    console.warn('Invalid percentage format:', num, error);
    return null;
  }
};

/**
 * Formats a number in compact notation (e.g., "1.2K", "5.5M")
 * @param num - Number to format
 * @param locale - Locale to use (defaults to 'en-US')
 * @returns Formatted compact number string or null if invalid
 */
export const formatCompactNumber = (
  num: number | string | null | undefined,
  locale: string = 'en-US',
): string | null => {
  if (num === null || num === undefined) return null;

  try {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return null;

    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(number);
  } catch (error) {
    console.warn('Invalid compact number format:', num, error);
    return null;
  }
};

/**
 * Rounds a number to specified decimal places
 * @param num - Number to round
 * @param decimals - Number of decimal places (defaults to 2)
 * @returns Rounded number or null if invalid
 */
export const roundNumber = (
  num: number | string | null | undefined,
  decimals: number = 2,
): number | null => {
  if (num === null || num === undefined) return null;

  try {
    const number = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(number)) return null;

    return Math.round(number * Math.pow(10, decimals)) / Math.pow(10, decimals);
  } catch (error) {
    console.warn('Invalid number for rounding:', num, error);
    return null;
  }
};

/**
 * Checks if a value is a valid number
 * @param value - Value to check
 * @returns True if valid number, false otherwise
 */
export const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Parses a string to number with fallback
 * @param value - String value to parse
 * @param fallback - Fallback value if parsing fails
 * @returns Parsed number or fallback value
 */
export const parseNumber = (
  value: string | null | undefined,
  fallback: number = 0,
): number => {
  if (!value) return fallback;

  try {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  } catch {
    return fallback;
  }
};

/**
 * Formats a number for Thai locale (common in business apps)
 * @param num - Number to format
 * @returns Formatted number string
 */
export const formatNumberThai = (
  num: number | string | null | undefined,
): string | null => {
  return formatNumber(num, 'th-TH');
};
