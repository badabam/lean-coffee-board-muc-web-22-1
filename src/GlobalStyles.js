import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 112.5%;
  }

  input, label, button, textarea {
    font-size: 1em;
  }

`;
