import ChromeBrowser from './src/config/playwright';
import {SAMSURL} from './src/constants/urls';
const chrome = new ChromeBrowser();
chrome.init().then(async ({browser, page}) => {
  await page.goto(SAMSURL);
  await page.screenshot({path: 'sams.png'});
  await browser.close();
});
