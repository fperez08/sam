export class LaunchBrowserError extends Error {
  constructor(
    message: string = 'An error occurred while launching the browser or create the page'
  ) {
    super(message);
    this.name = 'LaunchBrowserError';
  }
}
