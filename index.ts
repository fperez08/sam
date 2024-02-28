import type {AxiosResponse} from 'axios';
import SamsDataManager from './src/data/sams_data';
import type {SaleItemRaw} from './src/models/sams_data_models';
import SamsService from './src/services/sams/sams_services';
import {extractDataFromArray} from './src/utils/data_utils';
import {SAMS_SERVICE_CONFIG} from './src/config/sams_request_config';
import {DBService} from './src/database/databse_service';
const jp = require('jsonpath');
require('dotenv').config();
const salesQuery = require('./src/data/sams_sales_query.json');

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
const samsData = new SamsDataManager();
console.log('Starting sales');

const response = await samsService.getSales();
if ((response as AxiosResponse).data) {
  const data = (response as AxiosResponse).data;
  const productAttributes = jp.query(data, '$..attributes');
  const transformedData = extractDataFromArray(
    productAttributes,
    salesQuery
  ) as SaleItemRaw[];
  const salesData = samsData.cleanSalesData(transformedData);
  const formattedSalesData = samsData.formatSalesData(salesData);
  try {
    await DBService.storeData('sales', formattedSalesData);
  } catch (error) {
    console.error((error as Error).message);
  }
} else {
  console.error('Something went wrong...:(');
}
