import css from '../../constructors/css';
import kebabCaseToCamelCase from '../kebabCaseToCamelCase';

const convertCssToObject = (css: any, options: { theme: any; props: any }) => {
  return css
    .map(rawString =>
      typeof rawString === 'function'
        ? rawString({ theme: options.theme, ...options.props })
        : rawString
    )
    .join('')
    .split('\n')
    .filter(a => a.trim().length > 0)
    .map(a => a.split(':'))
    .reduce(
      (acc, [key, value]) => ((acc[kebabCaseToCamelCase(key.trim())] = value.trim()), acc),
      {} as { [key: string]: string }
    );
};

describe('convert css that is made css constructor to pureObject', () => {
  it('#1 should convert correctly', () => {
    const styledCss = css`
      color: red;border: 1px solid black;
      border-radius: 16px;
    `;
    const expected = {
      color: 'red;',
      border: '1px solid black;',
      borderRadius: '16px;',
    };

    expect(convertCssToObject(styledCss)).toEqual(expected);
  });

  it('#2 should convert with theme', () => {
    const theme = {
      red: 'red',
    };
    const styledCss = css`
      color: ${props => props.theme.red};
      border: 1px solid black;
      border-radius: 16px;
    `;
    const expected = {
      color: 'red;',
      border: '1px solid black;',
      borderRadius: '16px;',
    };

    expect(convertCssToObject(styledCss, theme)).toEqual(expected);
  });

  it('#3 should convert with theme and props', () => {
    const theme = {
      red: 'red',
    };
    const props = {
      isTrue: true,
    };
    const styledCss = css`
      color: ${props => props.theme.red};
      border: 1px solid black;
      border-radius: ${props => (props.isTrue ? '16px' : '8px')};
    `;
    const expected = {
      color: 'red;',
      border: '1px solid black;',
      borderRadius: '16px;',
    };

    expect(convertCssToObject(styledCss, theme, props)).toEqual(expected);
  });
});
