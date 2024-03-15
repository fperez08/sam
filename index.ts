require('dotenv').config();
import SamsService from './src/services/sams/sams_services';
import {CONFIGS} from './src/config/sams_request_config';
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
  sortSaleProductsByPriceDiffDescending,
} from './src/data/sams_data';
import {pipe} from './src/utils/helper';

for (let index = 0; index < CONFIGS.length; index++) {
  const samsService = new SamsService(CONFIGS[index].request_config);
  console.log('Starting Sams WebScraper...');

  const response = await samsService.getProductsOnSale(CONFIGS[index].path);
  console.log('Response get from sales...');
  if (response.length === 0) {
    console.log(`${CONFIGS[index].name} has no products`);
    continue;
  }

  const productsOnSale = pipe(
    mergeProductAttributes,
    getSaleProductsForEmail,
    sortSaleProductsByPriceDiffDescending
  )(response);

  if (productsOnSale.length > 0) {
    console.log('🚀 ~ productsOnSale:', productsOnSale[0]);
    const table = generateHtmlTable(productsOnSale, SALES_EMAIL_TABLE_HEADERS);
    EMAIL_OPTIONS.subject = `🔥 ${CONFIGS[index].name} 🔥`;
    EMAIL_OPTIONS.html = table;
    console.log('Sending email...');
    const emailService = new EmailService(TRANSPORTER_CONFIG);
    //emailService.sendEmail(EMAIL_OPTIONS);
  }
}
