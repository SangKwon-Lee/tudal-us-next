import { css } from "@emotion/react";
export const global = css`
  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 700;
    src: local("Spoqa Han Sans Neo Bold"),
      url("/assets/fonts/SpoqaHanSansNeo-Bold.ttf") format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 500;
    src: local("Spoqa Han Sans Neo Medium"),
      url("/assets/fonts/SpoqaHanSansNeo-Medium.ttf") format("truetype");
    font-display: swap;
  }

  @font-face {
    font-family: "Spoqa Han Sans Neo";
    font-weight: 400;
    src: local("Spoqa Han Sans Neo Regular"),
      url("/assets/fonts/SpoqaHanSansNeo-Regular.ttf") format("truetype");
    font-display: swap;
  }

  html,
  body {
    :lang(kr) {
    }
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
  }
  button {
    font-family: Spoqa Han Sans Neo, -apple-system, Roboto, BlinkMacSystemFont,
      Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    font-family: Spoqa Han Sans Neo, Noto Sans Kr, --apple-system,
      BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
      "Open Sans", "Helvetica Neue", sans-serif, Roboto, "Segoe UI", Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    border: 0;
    background-color: transparent;
    border-collapse: collapse;
    border-spacing: 0;
    -webkit-appearence: none;
    appearance: none;
    color: #4b4b4b;
    font-size: 1rem;
    font-display: swap;
  }

  :root {
    /* Font Color */
    --white: #ffffff;
    --black: #2b2b2b;
    --dark-gray: #444444;
    --gray: #c9c6c6;
    --light-gray: #f6f3f3;
    --blue: #0080ff;
    --red: #ff1d40;
    --light-red: #ffe8eb;
    --tag-blue: #00376b;
    --text-gray: #707070;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    margin: 0px;
  }

  h2 {
    font-size: 16px;
    font-weight: 700;
    padding: 0px;
  }

  h3 {
    font-size: 14px;
    font-weight: 700;
    margin: 0px;
  }

  h4 {
    font-size: 12px;
    font-weight: 700;
    margin: 0px;
  }
`;
