import { createUrl, getQuerysUrl } from '.';

describe('url', () => {
  describe('createUrl', () => {
    it('should create a url correctly', () => {
      const url = 'https://example.com/';
      const result = createUrl(url);
  
      expect(result.href).toBe(url);
    });
  });
  
  describe('getQuerysUrl', () => {
    it('should return query parameters from a url', () => {
      const { search } = new URL('https://example.com?foo=bar&baz=qux');
      const expectedQueryParams = {
        foo: 'bar',
        baz: 'qux',
      };
  
      const result = getQuerysUrl(search);
  
      expect(result).toEqual(expectedQueryParams);
    });
  
    it('if no query parameters exist return an empty object', () => {
      const { search } = new URL('https://example.com');
      const expectedQueryParams = {};
  
      const result = getQuerysUrl(search);
  
      expect(result).toEqual(expectedQueryParams);
    });
  });
});
