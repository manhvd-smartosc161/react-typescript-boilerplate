import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

export const DATE_FORMATS = {
  // For display in UI (readable format)
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',

  // For input fields (ISO format)
  INPUT: 'YYYY-MM-DD',
  INPUT_WITH_TIME: 'YYYY-MM-DDTHH:mm',

  // For API/database storage
  ISO: 'YYYY-MM-DDTHH:mm:ssZ',
  ISO_DATE_ONLY: 'YYYY-MM-DD',
} as const;

/**
 * Formats a date for display in UI components
 * @param date - Date to format (Date, string, or null/undefined)
 * @param format - Format to use (defaults to DISPLAY)
 * @returns Formatted date string or empty string if invalid
 */
export const formatDate = (
  date: Date | string | null | undefined,
  format: string = DATE_FORMATS.DISPLAY,
): string => {
  if (!date) return '';

  try {
    return dayjs(date).format(format);
  } catch (error) {
    console.warn('Invalid date format:', date, error);
    return '';
  }
}; /**
 * Formats a date for input fields (YYYY-MM-DD)
 * @param date - Date to format
 * @returns Formatted date string or empty string if invalid
 */
export const formatDateForInput = (
  date: Date | string | null | undefined,
): string => {
  return formatDate(date, DATE_FORMATS.INPUT);
}; /**
 * Formats a date with time for input fields
 * @param date - Date to format
 * @returns Formatted date string or empty string if invalid
 */
export const formatDateTimeForInput = (
  date: Date | string | null | undefined,
): string => {
  return formatDate(date, DATE_FORMATS.INPUT_WITH_TIME);
}; /**
 * Parses a date string into a Date object
 * @param dateString - Date string to parse
 * @param format - Format of the input string (optional, dayjs will guess)
 * @returns Date object or null if invalid
 */
export const parseDate = (
  dateString: string | null | undefined,
  format?: string,
): Date | null => {
  if (!dateString) return null;

  try {
    const parsed = format ? dayjs(dateString, format) : dayjs(dateString);
    return parsed.isValid() ? parsed.toDate() : null;
  } catch (error) {
    console.warn('Failed to parse date:', dateString, error);
    return null;
  }
}; /**
 * Checks if a date is valid
 * @param date - Date to validate
 * @returns True if valid, false otherwise
 */
export const isValidDate = (date: any): boolean => {
  return dayjs(date).isValid();
}; /**
 * Gets the current date/time
 * @returns Current dayjs instance
 */
export const now = (): dayjs.Dayjs => {
  return dayjs();
}; /**
 * Adds/subtracts time from a date
 * @param date - Base date
 * @param amount - Amount to add (positive) or subtract (negative)
 * @param unit - Time unit (days, months, years, etc.)
 * @returns New dayjs instance
 */
export const addTime = (
  date: Date | string,
  amount: number,
  unit: dayjs.ManipulateType,
): dayjs.Dayjs => {
  return dayjs(date).add(amount, unit);
}; /**
 * Calculates the difference between two dates
 * @param date1 - First date
 * @param date2 - Second date
 * @param unit - Unit to calculate difference in
 * @returns Difference as a number
 */
export const dateDiff = (
  date1: Date | string,
  date2: Date | string,
  unit: dayjs.QUnitType | dayjs.OpUnitType = 'days',
): number => {
  return dayjs(date1).diff(dayjs(date2), unit);
}; /**
 * Checks if a date is today
 * @param date - Date to check
 * @returns True if the date is today
 */
export const isToday = (date: Date | string): boolean => {
  return dayjs(date).isSame(dayjs(), 'day');
}; /**
 * Checks if a date is in the past
 * @param date - Date to check
 * @returns True if the date is in the past
 */
export const isPast = (date: Date | string): boolean => {
  return dayjs(date).isBefore(dayjs());
}; /**
 * Checks if a date is in the future
 * @param date - Date to check
 * @returns True if the date is in the future
 */
export const isFuture = (date: Date | string): boolean => {
  return dayjs(date).isAfter(dayjs());
}; /**
 * Formats a date for Material-UI DatePicker value prop
 * @param date - Date to format
 * @returns Formatted date string for DatePicker
 */
export const formatForDatePicker = (
  date: Date | string | null | undefined,
): string | null => {
  if (!date) return null;
  try {
    return dayjs(date).format(DATE_FORMATS.INPUT);
  } catch {
    return null;
  }
}; /**
 * Creates a date from Material-UI DatePicker value
 * @param dateString - Date string from DatePicker
 * @returns Date object or null if invalid
 */
export const parseFromDatePicker = (
  dateString: string | null | undefined,
): Date | null => {
  return parseDate(dateString, DATE_FORMATS.INPUT);
}; /**
 * Formats relative time (e.g., "2 hours ago", "in 3 days")
 * @param date - Date to format
 * @returns Relative time string
 */
export const formatRelativeTime = (date: Date | string): string => {
  return dayjs(date).fromNow();
}; /**
 * Gets the start of day for a given date
 * @param date - Date to get start of day for
 * @returns New date at start of day (00:00:00)
 */
export const startOfDay = (date: Date | string): Date => {
  return dayjs(date).startOf('day').toDate();
}; /**
 * Gets the end of day for a given date
 * @param date - Date to get end of day for
 * @returns New date at end of day (23:59:59)
 */
export const endOfDay = (date: Date | string): Date => {
  return dayjs(date).endOf('day').toDate();
}; /**
 * Checks if two dates are the same day
 * @param date1 - First date
 * @param date2 - Second date
 * @returns True if same day
 */
export const isSameDay = (
  date1: Date | string,
  date2: Date | string,
): boolean => {
  return dayjs(date1).isSame(dayjs(date2), 'day');
}; /**
 * Gets localized date string for Thai locale
 * @param date - Date to format
 * @param format - Format to use
 * @returns Localized date string
 */
export const formatDateThai = (
  date: Date | string | null | undefined,
  format: string = DATE_FORMATS.DISPLAY,
): string => {
  if (!date) return '';

  try {
    return dayjs(date).format(format);
  } catch (error) {
    console.warn('Invalid date format:', date, error);
    return '';
  }
};
