require('dotenv').config();
import SamsService from './src/services/sams/sams_services';
import {SAMS_SERVICE_CONFIG} from './src/config/sams_request_config';
import EmailService from './src/services/email_service';
import {generateHtmlTable} from './src/utils/html';
import {
  TRANSPORTER_CONFIG,
  EMAIL_OPTIONS,
  SALES_EMAIL_TABLE_HEADERS,
} from './src/config/email_config';
import {
  getSaleItemsForEmail,
  mergeItemAttributes,
  getSaleItemsWithDiscountAboveOrEqualTo,
  sortSaleItemsByDiscountDescending,
} from './src/data/sams_data';
import {pipe} from './src/utils/helper';

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
const DISCOUNT = 20;
console.log('Starting Sams WebScraper...');

const response = await samsService.getSales();
console.log('Response get from sales...');
const samsSalesData = pipe(mergeItemAttributes, getSaleItemsForEmail)(response);
const saleItemsWithHigDiscount = getSaleItemsWithDiscountAboveOrEqualTo(
  samsSalesData,
  DISCOUNT
);
if (saleItemsWithHigDiscount.length > 0) {
  const sortedSaleItems = sortSaleItemsByDiscountDescending(
    saleItemsWithHigDiscount
  );
  console.log('🚀 ~ saleItemsWithHigDiscount:', sortedSaleItems);
  const table = generateHtmlTable(sortedSaleItems, SALES_EMAIL_TABLE_HEADERS);
  EMAIL_OPTIONS.html = table;
  console.log('Sending email...');
  const emailService = new EmailService(TRANSPORTER_CONFIG);
  emailService.sendEmail(EMAIL_OPTIONS);
}
