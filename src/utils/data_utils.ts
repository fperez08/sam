const jp = require('jsonpath');
/**
Extracts data from an array of objects based on a set of JSONPath queries.
@param data - the array of objects to extract data from
@param queries - a map of JSONPath query strings to property names
@returns an array of objects containing the extracted data
 */
export function extractDataFromArray(
  data: object[],
  queries: {[key: string]: string}
): object[] {
  const result: object[] = [];
  const keys = Object.keys(queries);
  data.forEach(item => {
    // eslint-disable-next-line prefer-const
    let newItem: {[key: string]: object} = {};
    keys.forEach(key => {
      const queryResult = jp.query(item, queries[key]);
      if (queryResult.length > 0) {
        newItem[key] = queryResult[0];
      } else {
        newItem[key] = [];
      }
    });
    result.push(newItem);
  });
  return result;
}

/**
Merges two objects by copying the properties of obj2 into obj1 if obj2's value is not empty.
@param obj1 - the first object to merge
@param obj2 - the second object to merge
@returns the merged object
 */
export function mergeObjects<T>(obj1: T, obj2: T): T {
  const mergedObject = {...obj1};

  for (const prop in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
      if (obj2[prop] !== '') {
        mergedObject[prop] = obj2[prop];
      }
    }
  }

  return mergedObject;
}
