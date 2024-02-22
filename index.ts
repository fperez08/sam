import SamsDataManager from './src/data/sams_data';
import type {SaleItemRaw} from './src/models/sams_data_models';
import {extractDataFromArray} from './src/utils/data_utils';
const jp = require('jsonpath');
const data = require('./data.json');

const productAttributes = jp.query(data, '$..attributes');
const samsData = new SamsDataManager();
const transformedData = extractDataFromArray(productAttributes, {
  name: '$.skuDisplayName',
  displayName: "$['product.displayName']",
  lastPrice: "$['sku.lastPrice']",
  finalPrice: "$['sku.finalPrice']",
  productPromotions: "$['product.promotions']",
  saleRemainingTime: '$.eventRemainingTime',
  saleExpiresAt: '$.eventExpiresAt',
  status: 'STR0000009999',
}) as SaleItemRaw[];
const salesData = samsData.cleanSalesData(transformedData);
const formattedSalesData = samsData.formatSalesData(salesData);
console.log(formattedSalesData);
