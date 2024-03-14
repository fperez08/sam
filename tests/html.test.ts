import {generateHtmlTable} from '../src/utils/html';

describe('generateHtmlTable', () => {
  test('should return an empty string when the jsonArray is empty', () => {
    // Arrange
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonArray: {[key: string]: any}[] = [];
    const headers: string[] = [];

    // Act
    const result = generateHtmlTable(jsonArray, headers);

    // Assert
    expect(result).toEqual('');
  });

  test('should generate an HTML table with headers and data', () => {
    // Arrange
    const jsonArray = [
      {name: 'John', age: 30, city: 'New York'},
      {name: 'Jane', age: 25, city: 'Los Angeles'},
      {name: 'Bob', age: 40, city: 'Chicago'},
    ];
    const headers = ['name', 'age', 'city'];

    // Act
    const result = generateHtmlTable(jsonArray, headers);

    // Assert
    expect(result).toContain('<table');
    expect(result).toContain('Name</th>');
    expect(result).toContain('Age</th>');
    expect(result).toContain('City</th>');
    expect(result).toContain('John</td>');
    expect(result).toContain('30</td>');
    expect(result).toContain('New York</td>');
    expect(result).toContain('Jane</td>');
    expect(result).toContain('25</td>');
    expect(result).toContain('Los Angeles</td>');
    expect(result).toContain('Bob</td>');
    expect(result).toContain('40</td>');
    expect(result).toContain('Chicago</td>');
  });

  test('should generate an HTML table with default headers', () => {
    // Arrange
    const jsonArray = [
      {name: 'John', age: 30, city: 'New York'},
      {name: 'Jane', age: 25, city: 'Los Angeles'},
      {name: 'Bob', age: 40, city: 'Chicago'},
    ];

    // Act
    const result = generateHtmlTable(jsonArray);

    // Assert
    expect(result).toContain('<table');
    expect(result).toContain('Name</th>');
    expect(result).toContain('Age</th>');
    expect(result).toContain('City</th>');
    expect(result).toContain('John</td>');
    expect(result).toContain('30</td>');
    expect(result).toContain('New York</td>');
    expect(result).toContain('Jane</td>');
    expect(result).toContain('25</td>');
    expect(result).toContain('Los Angeles</td>');
    expect(result).toContain('Bob</td>');
    expect(result).toContain('40</td>');
    expect(result).toContain('Chicago</td>');
  });

  test('should join array values with comma', () => {
    // Arrange
    const jsonArray = [
      {name: 'John', hobbies: ['Reading', 'Gaming', 'Cooking']},
      {name: 'Jane', hobbies: ['Singing', 'Dancing']},
    ];
    const headers = ['name', 'hobbies'];

    // Act
    const result = generateHtmlTable(jsonArray, headers);

    // Assert
    expect(result).toContain('<table');
    expect(result).toContain('Name</th>');
    expect(result).toContain('Hobbies</th>');
    expect(result).toContain('John</td>');
    expect(result).toContain('Reading,Gaming,Cooking</td>');
    expect(result).toContain('Jane</td>');
    expect(result).toContain('Singing,Dancing</td>');
  });
});
