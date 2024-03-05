import {mock} from 'bun:test';
mock.module('bun:sqlite', () => {
  return {
    Database: class MockDatabase {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
      run(_: string, __: any[]) {
        // Do nothing for now
      }
    },
  };
});
