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
  getSaleProductsForEmail,
  mergeProductAttributes,
  filterSaleProductsByDiscountOrPromotion,
  sortSaleProductsByDiscountDescending,
} from './src/data/sams_data';
import {pipe} from './src/utils/helper';

const samsService = new SamsService(SAMS_SERVICE_CONFIG);
const categoryId = 'cat3030008';
console.log('Starting Sams WebScraper...');

const response = await samsService.getProductsOnSale(categoryId);
console.log('Response get from sales...');
const ProductsOnSale = pipe(
  mergeProductAttributes,
  getSaleProductsForEmail,
  filterSaleProductsByDiscountOrPromotion,
  sortSaleProductsByDiscountDescending
)(response);

if (ProductsOnSale.length > 0) {
  console.log('🚀 ~ pantryProductsOnSale:', ProductsOnSale);
  const table = generateHtmlTable(ProductsOnSale, SALES_EMAIL_TABLE_HEADERS);
  EMAIL_OPTIONS.html = table;
  console.log('Sending email...');
  const emailService = new EmailService(TRANSPORTER_CONFIG);
  emailService.sendEmail(EMAIL_OPTIONS);
}
