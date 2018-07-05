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
    LIGHT: '#f1f1f1',
    MEDIUM: '#eaeaea',
    DARK: '#333'
  },
  HEADER: '#1d1731',
  BODY: '#fffefe',
  SEARCH: THEME[TERTIARY_KEY]
};
