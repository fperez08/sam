const jp = require('jsonpath');
export function extractDataFromArray(
  data: Array<object>,
  transformer: {[key: string]: string}
): Array<object> {
  const result: object[] = [];
  const keys = Object.keys(transformer);
  data.forEach(item => {
    // eslint-disable-next-line prefer-const
    let newData: {[key: string]: object} = {};
    keys.forEach(key => {
      const queryResult = jp.query(item, transformer[key]);
      if (queryResult.length > 0) {
        newData[key] = queryResult[0];
      } else {
        newData[key] = [];
      }
    });
    result.push(newData);
  });
  return result;
}

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
