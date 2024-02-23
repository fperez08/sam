import type {AxiosRequestConfig, AxiosResponse} from 'axios';
import SamsDataManager from './src/data/sams_data';
import type {SaleItemRaw} from './src/models/sams_data_models';
import SamsService from './src/services/sams/sams_services';
import {extractDataFromArray} from './src/utils/data_utils';
import {SAMS_HOME_URL} from './src/constants/urls';
const jp = require('jsonpath');
const salesQuery = require('./src/data/sams_sales_query.json');
const samsServiceConfig =
  require('./src/config/sams_request_config.json') as AxiosRequestConfig;
samsServiceConfig.baseURL = SAMS_HOME_URL;

const samsService = new SamsService(samsServiceConfig);
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
  console.log(formattedSalesData);
} else {
  console.error('Something went wrong...:(');
}
