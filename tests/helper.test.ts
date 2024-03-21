import {
  pipe,
  getPropertyValue,
  convertTimeStampToDate,
  checkIfArrayIsEmpty,
  fileExists,
  saveJsonToFile,
  areArraysEqual,
} from '../src/utils/helper';
import {describe, expect, test} from 'bun:test';
describe('pipe', () => {
  test('should return the result of applying all functions in sequence', () => {
    // Arrange
    const addOne = (x: number) => x + 1;
    const multiplyByTwo = (x: number) => x * 2;
    const subtractThree = (x: number) => x - 3;
    const initialValue = 5;
    const expectedValue = subtractThree(multiplyByTwo(addOne(initialValue)));

    // Act
    const result = pipe(addOne, multiplyByTwo, subtractThree)(initialValue);

    // Assert
    expect(result).toEqual(expectedValue);
  });

  test('should return the initial value if no functions are provided', () => {
    // Arrange
    const initialValue = 10;

    // Act
    const result = pipe()(initialValue);

    // Assert
    expect(result).toEqual(initialValue);
  });
});

describe('pipe', () => {
  // Existing tests...

  test('should return the value of the specified property', () => {
    // Arrange
    const obj = {name: 'John', age: 30};
    const propertyName = 'name';
    const expectedValue = 'John';

    // Act
    const result = getPropertyValue(obj, propertyName);

    // Assert
    expect(result).toEqual(expectedValue);
  });

  test('should return an empty string if the property does not exist', () => {
    // Arrange
    const obj = {name: 'John', age: 30};
    const propertyName = 'address';
    const expectedValue = '';

    // Act
    const result = getPropertyValue(obj, propertyName);

    // Assert
    expect(result).toEqual(expectedValue);
  });
});

describe('convertTimeStampToDate', () => {
  test('should convert timestamp to date in the format "dd/mm/yyyy"', () => {
    // Arrange
    const timeStamp = 1625097600000; // June 30, 2021

    // Act
    const result = convertTimeStampToDate(timeStamp);

    // Assert
    expect(result).toEqual('01/07/2021');
  });

  test('should pad single-digit day and month with leading zeros', () => {
    // Arrange
    const timeStamp = 1609459200000; // January 1, 2021

    // Act
    const result = convertTimeStampToDate(timeStamp);

    // Assert
    expect(result).toEqual('01/01/2021');
  });
});

describe('checkIfArrayIsEmpty', () => {
  test('should return an empty array if the array is empty', () => {
    // Arrange
    const data: unknown[] = [];

    // Act & Assert
    expect(checkIfArrayIsEmpty(data)).toEqual([]);
  });

  test('should not throw an error if the array is not empty', () => {
    // Arrange
    const data = [1, 2, 3];

    // Act & Assert
    expect(() => checkIfArrayIsEmpty(data)).not.toThrow();
  });
});

describe('fileExists', () => {
  test('should return true if the file exists', () => {
    // Arrange
    const filePath = '/.gitignore';

    // Act
    const result = fileExists(filePath);

    // Assert
    expect(result).toBe(true);
  });

  test('should return false if the file does not exist', () => {
    // Arrange
    const filePath = '/path/to/nonexistent/file.txt';

    // Act
    const result = fileExists(filePath);

    // Assert
    expect(result).toBe(false);
  });
});

describe('saveJsonToFile', () => {
  test('should save the JSON object to the specified file path', () => {
    // Arrange
    const jsonObj = {name: 'John', age: 30};
    const filePath = '/file.json';

    // Act
    saveJsonToFile(jsonObj, filePath);

    // Assert
    expect(fileExists(filePath)).toBe(true);
  });

  test('should handle errors when saving the JSON object', () => {
    // Arrange
    const jsonObj = {name: 'John', age: 30};
    const filePath = '/path/to/nonexistent/directory/file.json';

    // Act
    saveJsonToFile(jsonObj, filePath);

    // Assert
    expect(fileExists(filePath)).toBe(false);
  });
});

describe('areArraysEqual', () => {
  test('should return true if the arrays are equal', () => {
    // Arrange
    const arr1 = [{id: 1}, {id: 2}, {id: 3}];
    const arr2 = [{id: 1}, {id: 2}, {id: 3}];

    // Act
    const result = areArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(true);
  });

  test('should return false if the arrays are not equal', () => {
    // Arrange
    const arr1 = [{id: 1}, {id: 2}, {id: 3}];
    const arr2 = [{id: 1}, {id: 2}, {id: 4}];

    // Act
    const result = areArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });

  test('should return false if the arrays have different lengths', () => {
    // Arrange
    const arr1 = [{id: 1}, {id: 2}, {id: 3}];
    const arr2 = [{id: 1}, {id: 2}];

    // Act
    const result = areArraysEqual(arr1, arr2);

    // Assert
    expect(result).toBe(false);
  });
});
