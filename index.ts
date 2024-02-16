import ChromeBrowser from './src/config/playwright';
import {SAMS_HOME_URL} from './src/constants/urls';
const chrome = new ChromeBrowser();
chrome.init().then(async ({browser, page}) => {
  await page.goto(SAMS_HOME_URL);
  await page.screenshot({path: 'sams.png'});
  await browser.close();
});
