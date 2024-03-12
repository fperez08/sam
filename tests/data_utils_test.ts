import {mergeObjects, extractDataFromArray} from '../src/utils/helper';
import {describe, test, expect} from 'bun:test';
describe('mergeObjects', () => {
  test('should merge two objects with the same properties and values', () => {
    const obj1 = {a: 1, b: 2, c: 3};
    const obj2 = {a: 1, b: 2, c: 3};
    const expectedResult = {a: 1, b: 2, c: 3};
    const result = mergeObjects(obj1, obj2);
    expect(result).toEqual(expectedResult);
  });

  test('should merge two objects where object 1 has more properties than object 2', () => {
    const obj1 = {a: 1, b: 2, c: 3, d: 4};
    const obj2 = {b: 2, c: 3};
    const expectedResult = {a: 1, b: 2, c: 3, d: 4};
    const result = mergeObjects(obj1, obj2);
    expect(result).toEqual(expectedResult);
  });

  test('should merge two objects where object 1 has more properties than object 2 and the additional properties in object 1 are not present in object 2', () => {
    const obj1 = {a: 1, b: 2, c: 3, d: 4};
    const obj2 = {b: 2, c: 3};
    const expectedResult = {a: 1, b: 2, c: 3, d: 4};
    const result = mergeObjects(obj1, obj2);
    expect(result).toEqual(expectedResult);
  });

  test('should merge two objects where object 1 has more properties than object 2 and the additional properties in object 1 are present in object 2 with different values', () => {
    const obj1 = {a: 1, b: 2, c: 3, d: 4};
    const obj2 = {b: 2, c: 3, e: 5};
    const expectedResult = {a: 1, b: 2, c: 3, d: 4, e: 5};
    // @ts-expect-error: Unreachable code error
    const result = mergeObjects(obj1, obj2);
    expect(result).toEqual(expectedResult);
  });

  test('should merge two objects where object 1 has fewer properties than object 2 and the missing properties in object 1 are present in object 2 with different values', () => {
    const obj1 = {a: 1, b: 2};
    const obj2 = {b: 2, c: 3, d: 4};
    const expectedResult = {a: 1, b: 2, c: 3, d: 4};
    // @ts-expect-error: Unreachable code error
    const result = mergeObjects(obj1, obj2);
    expect(result).toEqual(expectedResult);
  });
});

describe('extractDataFromArray', () => {
  test('should extract data from an array of objects based on JSONPath queries', () => {
    // Sample data array
    const data = [
      {id: 1, name: 'John', age: 30},
      {id: 2, name: 'Jane', age: 25},
    ];

    // Sample JSONPath queries
    const queries = {
      id: '$.id',
      name: '$.name',
      age: '$.age',
    };

    // Expected result
    const expectedResult = [
      {id: 1, name: 'John', age: 30},
      {id: 2, name: 'Jane', age: 25},
    ];

    // Invoke the function
    const result = extractDataFromArray(data, queries);

    // Assert that the result matches the expected result
    expect(result).toEqual(expectedResult);
  });

  test('should handle missing data gracefully', () => {
    // Sample data array with missing properties
    const data = [{id: 1}];

    // JSONPath query with missing property
    const queries = {id: '$.id', name: '$.name'};

    // Expected result with missing properties replaced by empty arrays
    const expectedResult = [{id: 1, name: []}];

    // Invoke the function
    const result = extractDataFromArray(data, queries);

    // Assert that the result matches the expected result
    expect(result).toEqual(expectedResult);
  });
});
