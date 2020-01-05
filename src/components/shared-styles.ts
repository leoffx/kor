import { css } from 'lit-element'

export const sharedStyles = css`
  /* colors */
  html, *[theme="light"] {
    --neutral-1: 0, 0, 0;
    --neutral-2: 255, 255, 255;
    --accent-1: 60, 100, 240;
    --accent-1b: 70, 110, 250;
    --accent-1c: 50, 90, 230;
    --base-0: 255, 255, 255;
    --base-1: 235, 235, 235;
    --base-2: 245, 245, 245;
    --base-3: 255, 255, 255;
    --base-4: 255, 255, 255;
    --functional-red: 211, 47, 47;
    --functional-yellow: 249, 168, 37;
    --functional-green: 46, 123, 50;
    --text-1: rgba(0, 0, 0, .90);
    --text-2: rgba(0, 0, 0, .60);
    --text-3: rgba(0, 0, 0, .20);
    --shadow-1: 0 2px 8px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.05);
  }
  *[theme="dark"] {
    --neutral-1: 255, 255, 255;
    --neutral-2: 0, 0, 0;
    --accent-1: 60, 100, 240;
    --accent-1b: 70, 110, 250;
    --accent-1c: 50, 90, 230;
    --base-0: 0, 0, 2;
    --base-1: 15, 15, 17;
    --base-2: 25, 25, 27;
    --base-3: 35, 35, 37;
    --base-4: 45, 45, 47;
    --functional-red: 211, 47, 47;
    --functional-yellow: 249, 168, 37;
    --functional-green: 46, 123, 50;
    --text-1: rgba(255, 255, 255, .90);
    --text-2: rgba(255, 255, 255, .60);
    --text-3: rgba(255, 255, 255, .20);
    --shadow-1: 0 2px 8px rgba(0,0,0,.1), 0 1px 4px rgba(0,0,0,.05);
  }
  /* typography */
  @font-face {
    font-family: 'md-icons';
    src:  local('Material Icons'), local('MaterialIcons-Regular'), url('./fonts/md-icons.woff2') format('woff2'), url('./fonts/md-icons.woff') format('woff');
  }
  @font-face {
    font-family: 'open-sans';
    font-style: normal;
    font-weight: 400;
    src: local('Open Sans Regular'), local('OpenSans-Regular'), url('./fonts/open-sans-regular.woff2') format('woff2'), url('./fonts/open-sans-regular.woff') format('woff');
  }
  @font-face {
    font-family: 'open-sans';
    font-style: normal;
    font-weight: 600;
    src: local('Open Sans SemiBold'), local('OpenSans-SemiBold'), url('./fonts/open-sans-semibold.woff2') format('woff2'), url('./fonts/open-sans-semibold.woff') format('woff');
  }
  @font-face {
    font-family: 'open-sans';
    font-style: normal;
    font-weight: 700;
    src: local('Open Sans Bold'), local('OpenSans-Bold'), url('./fonts/open-sans-bold.woff2') format('woff2'), url('./fonts/open-sans-bold.woff') format('woff');
  }
  html, body {
    --body-1: normal 13px/24px 'open-sans';
    --body-2: normal 12px/16px 'open-sans';
    --header-1: bold 16px/24px 'open-sans';
    --header-2: bold 15px/24px 'open-sans';
    font-family: 'open-sans', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: var(--text-1);
    height: 100%;
    width: 100%;
    margin: 0;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    -moz-osx-font-smoothing: grayscale;
  }
  /* scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
    visibility: hidden;
  }
  ::-webkit-scrollbar-track {
    background-color: rgba(var(--neutral-1), .05);
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(var(--neutral-1), .10);
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:active,
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(var(--neutral-1), .20)
  }
`;