import kebabCaseToCamelCase from '../kebabCaseToCamelCase';

describe('convert string kebabCase to camelCase', () => {
  it('#1', () => {
    expect(kebabCaseToCamelCase('abc-abc')).toBe('abcAbc');
    expect(kebabCaseToCamelCase('abc-abc-abc')).toBe('abcAbcAbc');
  });
});
