import {
  capitaliseFirstLetter,
  createQueryString,
  formatter,
  supermarketLogo,
  subtypeFormat,
} from '../utils/supermarketListUtils';
import { range } from '../utils/range';

describe('Utility Functions', () => {
  it('should capitalise the first letter of a string', () => {
    const unformattedString = 'hello, I am a test string';
    const formattedString = capitaliseFirstLetter(unformattedString);
    expect(formattedString).toBe('Hello, I am a test string');
  });

  it('should create correct query string from single supermarket name array', () => {
    const supermarket = ['waitrose'];
    const queryString = createQueryString(supermarket);
    expect(queryString).toBe('&supermarkets=Waitrose');
  });

  it('should create correct query string from multiple supermarket names array', () => {
    const supermarket = ['asda', 'tesco', 'waitrose'];
    const queryString = createQueryString(supermarket);
    expect(queryString).toBe(
      '&supermarkets=Asda&supermarkets=Tesco&supermarkets=Waitrose'
    );
  });

  it('should format an integer to a price string with GBP symbol', () => {
    const unformattedPrice = 599;
    const formattedPrice = formatter.format(unformattedPrice);
    expect(formattedPrice).toBe('£599.00');
  });

  it('should return a string formatted to supermarket logo svg path base path, from supermarket name', () => {
    const supermarket = 'Waitrose';
    const supermarketLogoPath = supermarketLogo(supermarket);
    expect(supermarketLogoPath).toBe('/waitrose_logo.svg');
  });

  it('should return the correct subtype format of "low alcohol" if any low alcohol subtype provided', () => {
    const subtypeUnformatted = 'beer low alcohol';
    const subtypeFormatted = subtypeFormat(subtypeUnformatted);
    expect(subtypeFormatted).toBe('Low Alcohol');
  });

  it('should return the correct subtype format of subtype that is not low alcohol if non low alcohol subtype provided', () => {
    const subtypeUnformatted = 'brandy and cognac';
    const subtypeFormatted = subtypeFormat(subtypeUnformatted);
    expect(subtypeFormatted).toBe('Brandy & Cognac');
  });

  it('should return an array of all numbers within a range from input of first and last numbers in range', () => {
    const rangeArr = range(5, 15);
    const expectedRangeArr = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    expect(rangeArr).toStrictEqual(expectedRangeArr);
  });
});
