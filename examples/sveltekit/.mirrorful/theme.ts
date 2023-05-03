
  export type Colors = keyof typeof Tokens.colors
  export type FontSize = keyof typeof Tokens.fontSizes
  export type Shadows = keyof typeof Tokens.boxShadows

  export type Token = Colors | FontSize | Shadows

  export const Tokens = {
  colors: {
    glacier: {
      '50': '#e0eff4',
      '100': '#c9e3ed',
      '200': '#b2d8e5',
      '300': '#9bccdd',
      '400': '#84c1d6',
      '500': '#6db5ce',
      '600': '#56a9c6',
      '700': '#409dbe',
      '800': '#388aa7',
      '900': '#307790',
      base: '#6db5ce',
    },
    amethyst: {
      '50': '#ede0f4',
      '100': '#dfc9ed',
      '200': '#d2b2e5',
      '300': '#c59bdd',
      '400': '#b784d6',
      '500': '#aa6dce',
      '600': '#9d56c6',
      '700': '#8f40be',
      '800': '#7e38a7',
      '900': '#6d3090',
      base: '#aa6dce',
    },
    whiskey: {
      '50': '#f4eae0',
      '100': '#eddac9',
      '200': '#e5cbb2',
      '300': '#ddbb9b',
      '400': '#d6ac84',
      '500': '#ce9c6d',
      '600': '#c68c56',
      '700': '#be7d40',
      '800': '#a76e38',
      '900': '#905f30',
      base: '#ce9c6d',
    },
    mantis: {
      '50': '#e1f4e0',
      '100': '#ccedc9',
      '200': '#b6e5b2',
      '300': '#a0dd9b',
      '400': '#8bd684',
      '500': '#75ce6d',
      '600': '#5fc656',
      '700': '#4abe40',
      '800': '#41a738',
      '900': '#389030',
      base: '#75ce6d',
    },
  },
  fontSizes: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
  fontWeights: {
    light: '200',
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    short: '1',
    normal: '1.5',
    tall: '2',
  },
  boxShadows: {
    sm: '1rem',
    md: '1.2rem',
    lg: '1.4rem',
  },
}
  