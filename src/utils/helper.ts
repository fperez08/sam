import fs from 'fs';
// eslint-disable-next-line node/no-extraneous-import
import {isEqual} from 'lodash';

export const pipe =
  (...functions: Function[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (initialValue: any) =>
    functions.reduce((acc, fn) => fn(acc), initialValue);

/**
 * Returns the value of a property of an object, or an empty string if the property does not exist.
 * @param obj - The object from which to retrieve the property value.
 * @param propertyName - The name of the property to retrieve.
 * @returns The value of the property, or an empty string if the property does not exist.
 */
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

/**
 * Checks if an array is empty and returns if it is.
 * @param data - The array to check.
 * @returns The array if it is not empty.
 */
export function checkIfArrayIsEmpty(data: unknown[]) {
  if (data.length === 0) return [];
}

/**
 * Checks if a file exists at the specified file path.
 * @param filePath - The path of the file to check.
 * @returns A boolean indicating whether the file exists or not.
 */
export function fileExists(filePath: string) {
  try {
    fs.accessSync(`${process.cwd()}${filePath}`, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Saves a JSON object to a file.
 * @param jsonObj - The JSON object to save.
 * @param filePath - The file path where the JSON object will be saved.
 */
export function saveJsonToFile(jsonObj: unknown, filePath: string) {
  const jsonString = JSON.stringify(jsonObj, null, 2);

  try {
    fs.writeFileSync(`${process.cwd()}${filePath}`, jsonString, 'utf-8');
    console.log(`JSON object saved to ${filePath}`);
  } catch (error) {
    console.error(
      `Error saving JSON object to ${process.cwd()}${filePath}:`,
      error
    );
  }
}

/**
 * Compares two arrays and returns whether they are equal.
 * @param arr1 - The first array to compare.
 * @param arr2 - The second array to compare.
 * @returns A boolean indicating whether the arrays are equal or not.
 */
export function areArraysEqual(arr1: object[], arr2: object[]): boolean {
  return isEqual(arr1, arr2);
}
