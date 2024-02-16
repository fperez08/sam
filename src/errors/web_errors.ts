export class LaunchBrowserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LaunchBrowserError';
  }
}
