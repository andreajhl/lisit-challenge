import { matchNumber } from ".";

describe('regex', () => {
  it('returns the first matching number', () => {
    const text = 'The price is $12 for the first item, and $9 for the second item.';
    expect(matchNumber(text)).toEqual('12');
  });

  it('returns an empty string if there are no matches', () => {
    const text = 'This text does not contain any numbers.';
    expect(matchNumber(text)).toEqual('');
  });
})