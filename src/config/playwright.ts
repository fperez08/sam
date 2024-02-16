import {
  type LaunchOptions,
  type Page,
  type Browser,
  type BrowserType,
} from 'playwright';
type WebComponents = {browser: Browser; page: Page};
export default class WebBrowser {
  private launchOptions: LaunchOptions;
  private browserType: BrowserType;
  constructor(browser: BrowserType, launchOptions: LaunchOptions = {}) {
    this.browserType = browser;
    this.launchOptions = launchOptions;
  }
  async launchBrowser(): Promise<WebComponents> {
    try {
      const browser = await this.getBrowser();
      const page = await this.getPage(browser);
      return {browser, page};
    } catch (error) {
      console.error('🚀 ~ Browser ~ launchBrowser ~ error:', error);
      throw error;
    }
  }

  private async getBrowser(): Promise<Browser> {
    return this.browserType.launch(this.launchOptions);
  }

  private async getPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    return page;
  }
}
