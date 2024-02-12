import { normalizeText } from '.';

describe('strings', () => {
  describe('normalizeText', () => {
    it('validates that the text exists and returns in uppercase', () => {
      expect(normalizeText(' TeSt ')).toEqual('test');
    });
  });
});
