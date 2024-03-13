require('dotenv').config();
import SamsDataManager from './src/data/sams_data';
import SamsService from './src/services/sams/sams_services';
import {SAMS_SERVICE_CONFIG} from './src/config/sams_request_config';
import EmailService from './src/services/email_service';
import {generateHtmlTable} from './src/utils/html';
import {
  TRANSPORTER_CONFIG,
  EMAIL_OPTIONS,
  SALES_EMAIL_TABLE_HEADERS,
} from './src/config/email_config';

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
const DISCOUNT = 20;
console.log('Starting Sams WebScraper...');

const response = await samsService.getSales();
console.log('Response get from sales...');
const samsSalesData = new SamsDataManager(response);
const saleItemsWithHigDiscount =
  samsSalesData.getSaleItemsWithDiscountAboveOrEqualTo(
    samsSalesData.getSalesItemsForEmail(),
    DISCOUNT
  );
if (saleItemsWithHigDiscount.length > 0) {
  saleItemsWithHigDiscount.sort(
    (a, b) => parseInt(b.discount as string) - parseInt(a.discount as string)
  );
  console.log('🚀 ~ saleItemsWithHigDiscount:', saleItemsWithHigDiscount);
  const table = generateHtmlTable(
    saleItemsWithHigDiscount,
    SALES_EMAIL_TABLE_HEADERS
  );
  EMAIL_OPTIONS.html = table;
  console.log('Sending email...');
  const emailService = new EmailService(TRANSPORTER_CONFIG);
  emailService.sendEmail(EMAIL_OPTIONS);
}
