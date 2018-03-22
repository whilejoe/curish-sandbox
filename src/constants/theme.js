export const PRIMARY_KEY = 'primary';
export const SECONDARY_KEY = 'secondary';
export const TERTIARY_KEY = 'tertiary';
export const ERROR_KEY = 'error';

export const THEME = {
  [PRIMARY_KEY]: 'lightseagreen',
  [SECONDARY_KEY]: 'lightcoral',
  [TERTIARY_KEY]: 'royalBlue',
  [ERROR_KEY]: 'FireBrick'
};

export const PALETTE = {
  GRAY: {
    LIGHT: '#f8f8f8',
    MEDIUM: '#f1f1f1',
    DARK: '#333'
  },
  HEADER: '#eaeaea',
  BODY: '#fffefe',
  SEARCH: THEME[TERTIARY_KEY]
};
