export const pipe =
  (...functions: Function[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (initialValue: any) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

export function getPropertyValue(
  obj: {[key: string]: unknown},
  propertyName: string
): unknown {
  if (Object.prototype.hasOwnProperty.call(obj, propertyName)) {
    return obj[propertyName];
  }
  return '';
}

/**
 * Converts a Unix timestamp to a date string in the format "DD/MM/YYYY".
 * @param timeStamp - The Unix timestamp to convert.
 * @returns The date string.
 */
export function convertTimeStampToDate(timeStamp: number): string {
  const date = new Date(timeStamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
