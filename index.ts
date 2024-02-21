import {listTransform} from './src/utils/data_transform';
const jp = require('jsonpath');
const data = require('./data.json');

const productAttributes = jp.query(data, '$..attributes');
const transformedData = listTransform(productAttributes, {
  name: '$.skuDisplayName',
  lastPrice: "$['sku.lastPrice']",
});
console.log(transformedData);
