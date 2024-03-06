import type {AxiosResponse} from 'axios';
import SamsDataManager from './src/data/sams_data';
import type {SaleItemRaw} from './src/models/sams_data_models';
import SamsService from './src/services/sams/sams_services';
import {extractDataFromArray} from './src/utils/data_utils';
import {SAMS_SERVICE_CONFIG} from './src/config/sams_request_config';
import {DBService} from './src/database/databse_service';
import EmailService from './src/services/email_service';
import {generateHtmlTable} from './src/utils/html';
import type Mail from 'nodemailer/lib/mailer';
const jp = require('jsonpath');
require('dotenv').config();
const salesQuery = require('./src/data/sams_sales_query.json');

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
const samsData = new SamsDataManager();
const transporterConfig = {
  service: 'Gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASSWORD,
  },
};
const emailOptions: Mail.Options = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: 'Products on Sale',
};
console.log('Starting Sams WebScraper...');

const response = await samsService.getSales();
console.log('Response get from sales...');
if ((response as AxiosResponse).data) {
  const data = (response as AxiosResponse).data;
  const productAttributes = jp.query(data, '$..attributes');
  const transformedData = extractDataFromArray(
    productAttributes,
    salesQuery
  ) as SaleItemRaw[];
  const salesData = samsData.cleanSalesData(transformedData);
  const formattedSalesData = samsData.formatSalesData(salesData);
  const filteredData = jp.query(
    formattedSalesData,
    '$[?(@.status == "SELLABLE")]'
  );
  const discountedData = samsData.calculateItemsDiscount(filteredData);
  const finalSalesData = samsData.convertItemTimeStampToDate(
    discountedData.filter(item => item.saleExpiresAt)
  );
  const saleItemsWithHigDiscount = finalSalesData.filter(saleItem => {
    if (saleItem.discount) {
      return parseInt(saleItem.discount) >= 20;
    }
  });
  if (saleItemsWithHigDiscount.length > 0) {
    const table = generateHtmlTable(saleItemsWithHigDiscount, [
      'name',
      'displayName',
      'lastPrice',
      'finalPrice',
      'saleExpiresAt',
      'discount',
      'priceDifference',
    ]);
    emailOptions.html = table;
    console.log('Sending email...');
    const emailService = new EmailService(transporterConfig);
    emailService.sendEmail(emailOptions);
  }
  console.log('Saving the data: ', finalSalesData);
  DBService.storeSalesData(1, finalSalesData);
} else {
  console.error('Something went wrong...:(');
}
