import { css } from '@emotion/react';

export const reset = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }
`;
