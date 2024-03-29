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
  isDataChanged,
  mergeProductAttributes,
  sortSaleProductsByDiscountDescending,
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
  const transformedData = [
    'Despensa con descuentos',
    'Limpieza con descuentos',
    'Ultimas piezas con descuentos',
  ].includes(CONFIGS[index].name)
    ? pipe(
        mergeProductAttributes,
        getSaleProductsForEmail,
        sortSaleProductsByDiscountDescending
      )
    : pipe(mergeProductAttributes, getSaleProductsForEmail);
  const productsOnSale = transformedData(response);
  if (
    productsOnSale.length > 0 &&
    isDataChanged(productsOnSale, CONFIGS[index].file_path)
  ) {
    console.log('🚀 ~ productsOnSale:', productsOnSale);
    const table = generateHtmlTable(productsOnSale, SALES_EMAIL_TABLE_HEADERS);
    const subject = `🔥 ${CONFIGS[index].name} 🔥`;
    EMAIL_OPTIONS.subject = subject;
    EMAIL_OPTIONS.html = table;
    console.log(`Sending email: ${subject}...`);
    const emailService = new EmailService(TRANSPORTER_CONFIG);
    emailService.sendEmail(EMAIL_OPTIONS);
  } else {
    console.log('No changes in the products: ', CONFIGS[index].name);
  }
}
