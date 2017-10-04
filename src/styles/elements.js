import { normalize } from 'polished';
import { css, injectGlobal } from 'styled-components';
import { modularScale, stripUnit } from 'polished';

export const serifFont = '"Merriweather", serif';
export const sanserifFont = '"Source Sans Pro", sans-serif';

export const headingFont = serifFont;
export const headingFontWeight = 700;
export const headingFontColor = '#444';

export const copyFont = sanserifFont;
export const copyFontWeight = 400;
export const copyFontColor = '#333';

export const linkFont = sanserifFont;
export const linkFontWeight = 600;

const BASE = 0.9;
const RATIO = 1.25;
// const LINE_HEIGHT = 1.2;
// line-height: ${stripUnit(modularScale(3, BASE, RATIO)) * LINE_HEIGHT};

const headingMixin = css`
  font-family: ${headingFont};
  font-weight: ${headingFontWeight};
  color: ${headingFontColor};
`;

injectGlobal`
  ${normalize()};
  
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
  
  html {
    font-size: 18px;
    line-height: 30px;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${copyFont};
    font-weight: ${copyFontWeight};
    font-size: 1rem;
    line-height: 1.4;
    color: ${copyFontColor};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: auto;
    text-rendering: optimizeLegibility;
  }

  h1 {
    font-size: ${modularScale(3, BASE, RATIO)};
    margin: ${stripUnit(modularScale(3, BASE, RATIO)) * 0.5}em 0;
    ${headingMixin};
  }

  h2 {
    font-size: ${modularScale(2, BASE, RATIO)};
    margin: ${stripUnit(modularScale(2, BASE, RATIO)) * 0.5}em 0;
    ${headingMixin};
  }

  h3 {
    font-size: ${modularScale(1, BASE, RATIO)};
    margin: ${stripUnit(modularScale(1, BASE, RATIO)) * 0.5}em 0;
    ${headingMixin};
  }

  h4 {
    font-size: ${modularScale(0, BASE, RATIO)};
    margin: ${stripUnit(modularScale(0, BASE, RATIO)) * 0.5}em 0;
    ${headingMixin};
  }

  input,
  textarea,
  button,
  select,
  label,
  a {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  button {
    display: inline-block;
    background: transparent;
    border: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: ${linkFontWeight};
    cursor: pointer;
  
    &:focus {
      outline: none;
    }
  }
  
  a {
    color: currentColor;
    font-family: ${linkFont};
    font-weight: ${linkFontWeight};
    text-decoration: none;
  
    &:hover,
    &:focus {
      text-decoration: underline;
    }
  
    &:focus {
      outline: none;
    }
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
  
  p {
    font-size: 1.1em;
    line-height: 1.54;
    letter-spacing: .01em;
  }

  p,
  ul,
  ol,
  pre,
  table,
  blockquote {
    margin-top: 0rem;
    margin-bottom: 1.5em;
  }

  ul ul,
  ol ol,
  ul ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  hr {
    border: 1px solid;
    margin: -1px 0;
  }

  a,
  b,
  i,
  strong,
  em,
  small,
  code {
    line-height: 0;
  }

  sub,
  sup {
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }
`;
