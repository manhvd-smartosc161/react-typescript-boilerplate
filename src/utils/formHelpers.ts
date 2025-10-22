/**
 * Converts an enum and its label mapping to an array of options for form fields
 * @param enumObject - The enum object to convert
 * @param labelMap - A record mapping enum values to their display labels
 * @returns Array of options with value and label properties
 *
 * @example
 * ```ts
 * enum Status { Active = 'ACTIVE', Inactive = 'INACTIVE' }
 * const labels: Record<Status, string> = {
 *   [Status.Active]: 'Active',
 *   [Status.Inactive]: 'Inactive',
 * };
 * const options = enumToOptions(Status, labels);
 * // Result: [{ value: 'ACTIVE', label: 'Active' }, { value: 'INACTIVE', label: 'Inactive' }]
 * ```
 */
export const enumToOptions = <T extends string>(
  enumObject: { [key: string]: T },
  labelMap: Record<T, string>,
): { value: T; label: string }[] => {
  return (Object.values(enumObject) as T[]).map((value) => ({
    value,
    label: labelMap[value],
  }));
};
