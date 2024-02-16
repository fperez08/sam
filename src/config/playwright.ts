import {
  type LaunchOptions,
  type Page,
  type Browser,
  type BrowserType,
} from 'playwright';
import {LaunchBrowserError} from '../errors/web_errors';
type WebComponents = {browser: Browser; page: Page};
export default class WebBrowserManager {
  private launchOptions: LaunchOptions;
  private browserType: BrowserType;
  constructor(browser: BrowserType, launchOptions: LaunchOptions = {}) {
    this.browserType = browser;
    this.launchOptions = launchOptions;
  }
  async launchBrowser(): Promise<WebComponents | LaunchBrowserError> {
    try {
      const browser = await this.createBrowserInstance();
      const page = await this.createPage(browser);
      return {browser, page};
    } catch (error) {
      console.error('🚀 ~ WebBrowserManager ~ launchBrowser ~ error:', error);
      return new LaunchBrowserError();
    }
  }

  private async createBrowserInstance(): Promise<Browser> {
    return this.browserType.launch(this.launchOptions);
  }

  private async createPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();
    return page;
  }
}
