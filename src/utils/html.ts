import {reverseCasing} from './string';

/**
 * Generate an HTML table from a JSON array.
 * @param {{[key:string]:any}} jsonArray - an array of JSON objects
 * @param {string[]} headers - an array of column headers
 * @returns an HTML table as a string
 */
export function generateHtmlTable(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  jsonArray: {[key: string]: any}[],
  headers: string[] = []
): string {
  if (jsonArray.length === 0) {
    return '';
  }

  const tableHeaders = headers.length > 0 ? headers : Object.keys(jsonArray[0]);
  let htmlTable = '<table style="border-collapse: collapse; width: 100%;">';

  // Table headers
  htmlTable += '<tr>';
  for (const header of tableHeaders) {
    htmlTable += `<th style="border: 1px solid #dddddd; padding: 8px;">${reverseCasing(header)}</th>`;
  }
  htmlTable += '</tr>';

  // Table data
  for (const item of jsonArray) {
    htmlTable += '<tr>';
    for (const header of tableHeaders) {
      htmlTable += `<td style="border: 1px solid #dddddd; padding: 8px;">${item[header]}</td>`;
    }
    htmlTable += '</tr>';
  }

  htmlTable += '</table>';
  return htmlTable;
}
