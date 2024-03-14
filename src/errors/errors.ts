export class SamsServiceGetSalesDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SamsServiceGetSalesDataError';
  }
}

export class ArrayIsEmptyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SamsDataManagerIsEmptyError';
  }
}
