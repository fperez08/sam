import {chromium, type LaunchOptions} from 'playwright';

export default class ChromeBrowser {
  private launchOptions: LaunchOptions;
  constructor(launchOptions: LaunchOptions = {}) {
    this.launchOptions = launchOptions;
  }
  async init() {
    const browser = await chromium.launch(this.launchOptions);
    const page = await browser.newPage();
    return {browser, page};
  }
}
