import type {AxiosError} from 'axios';
import SamsDataManager from './src/data/sams_data';
import SamsService from './src/services/sams/sams_services';
import {SAMS_SERVICE_CONFIG} from './src/config/sams_request_config';
//import {DBService} from './src/database/databse_service';
import EmailService from './src/services/email_service';
import {generateHtmlTable} from './src/utils/html';
import type Mail from 'nodemailer/lib/mailer';
import type {SaleItemAttributes} from './src/models/sams_data_models';
require('dotenv').config();

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
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
if (!(response as AxiosError).message) {
  const samsSalesData = new SamsDataManager(response as SaleItemAttributes[]);
  const saleItemsWithHigDiscount = samsSalesData
    .getSalesItemsForEmail()
    .filter(saleItem => {
      if (saleItem.discount) {
        return parseInt(saleItem.discount) >= 20;
      }
    });
  if (saleItemsWithHigDiscount.length > 0) {
    saleItemsWithHigDiscount.sort(
      (a, b) => parseInt(b.discount as string) - parseInt(a.discount as string)
    );
    console.log('🚀 ~ saleItemsWithHigDiscount:', saleItemsWithHigDiscount);
    const table = generateHtmlTable(saleItemsWithHigDiscount, [
      'name',
      'productPromotions',
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
  //DBService.storeSalesData(1, finalSalesData);
} else {
  console.error('Something went wrong...:(');
}
