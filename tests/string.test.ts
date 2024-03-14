import {reverseCasing} from '../src/utils/string';

test('reverseCasing should reverse the casing of a string', () => {
  // Arrange
  const input = 'helloWorld';
  const expectedOutput = 'Hello World';

  // Act
  const result = reverseCasing(input);

  // Assert
  expect(result).toEqual(expectedOutput);
});
