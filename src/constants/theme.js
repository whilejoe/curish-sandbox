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
    MEDIUM: '#e6e6e6',
    DARK: '#333'
  },
  HEADER: 'white',
  BODY: '#fafafa',
  SEARCH: THEME[TERTIARY_KEY]
};
