export const colorPalette = `
:host {
  /**
   * fuji color palette
   * https://git.vzbuilders.com/pages/fuji-design/fuji-docs/app/colorPalette.html
   */
  --white: 255 255 255;
  --marshmallow: 245 248 250;
  --grey-hair: 240 243 245;
  --dirty-seagull: 224 228 233;
  --pebble: 199 205 210;
  --bob: 176 185 193;
  --gandalf: 151 158 168;
  --shark: 130 138 147;
  --dolphin: 110 119 128;
  --battleship: 91 99 106;
  --charcoal: 70 78 86;
  --ramones: 44 54 63;
  --batcave: 35 42 49;
  --inkwell: 29 34 40;
  --midnight: 16 21 24;
  --black: 0 0 0;
  --watermelon: 255 82 87;
  --solo-cup: 235 15 41;
  --malibu: 255 0 128;
  --barney: 204 0 140;
  --mimosa: 255 211 51;
  --turmeric: 255 167 0;
  --masala: 255 139 18;
  --cheetos: 253 97 0;
  --carrot-juice: 255 82 13;
  --mulah: 26 197 103;
  --bonsai: 0 135 81;
  --spirulina: 0 160 160;
  --sea-foam: 17 211 205;
  --peeps: 125 203 255;
  --sky: 18 169 255;
  --dory: 15 105 255;
  --scooter: 0 99 235;
  --cobalt: 0 58 188;
  --denim: 26 13 171;
  --blurple: 93 94 255;
  --hendrix: 248 244 255;
  --thanos: 144 124 255;
  --starfish: 119 89 255;
  --hulk-pants: 126 31 255;
  --grape-jelly: 96 1 210;
  --mulberry: 80 21 176;
  --malbec: 57 0 125;

  /* Auction */
  --theme-gradient-start: 255 231 98;
  --theme-gradient-end: 252 218 25;
  --anchor-green: 58 191 186;
  --mark-buynow: 0 120 255;
  --mark-bidding: 255 139 18;
  --mark-metro-express: 255 77 82;
  --heart-red: 253 79 87;

  /* animation */
  --transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
`;

export const buttons = `
/*
 * html usage:
  <button
    class="buttons"
    data-type="primary"
    data-size="small"
  >
    Button
  </button>
*/

.buttons {
  --border-size: 2px;
  --border-color: var(--default-border-color, transparent);
  --background-color: var(--default-background-color, rgba(var(--dory)));
  --color: var(--default-text-color, rgba(var(--white)));
  --justify-content: var(--default-justify-content, center);

  --font-size: 14px;
  --block-size: 32px;
  --padding-inline: 24px;
  --gap: 4px;

  --box-shadow: 0 0 0 transparent;
  --border-radius: var(--block-size);
  --btn-active: scale(.97);

  --overlay-opacity-normal: 0;
  --overlay-opacity-active: .2;
  --overlay-opacity: var(--overlay-opacity-normal);
  --overlay-color: var(--inkwell);
  --overlay: rgba(var(--overlay-color)/var(--overlay-opacity));

  --transition: background-color 200ms var(--transition-timing-function);
}

.buttons{position:relative;font-size:var(--font-size);color:var(--color);font-family:system-ui,'Helvetica Neue',Helvetica,Arial,sans-serif;inline-size:fit-content;inline-size:-moz-fit-content;block-size:var(--block-size);background:var(--background-color);padding-inline:var(--padding-inline);border-radius:var(--border-radius);box-sizing:border-box;appearance:none;box-shadow:var(--box-shadow);display:flex;gap:var(--gap);align-items:center;overflow:hidden;border:0 none;transition:var(--transition);justify-content:var(--justify-content);}
.buttons::before{position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;box-sizing:border-box;border:var(--border-size) solid var(--border-color);border-radius:var(--border-radius);content:'';}
.buttons::after{position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;background-color:var(--overlay);content:'';pointer-events:none;z-index:1;transition:var(--transition);}
.buttons:focus,
.buttons:focus-visible{outline:0 none;}
.buttons:active{transform:var(--btn-active);}
.buttons:focus-visible{--overlay-opacity:var(--overlay-opacity-active);}
.buttons--full{inline-size:100%;justify-content:center;}

/*
 * types: https://git.vzbuilders.com/pages/fuji-design/fuji-docs/app/buttonsTypes.html
 * take light background spec only
 */
.buttons[data-type='primary'] {
  --default-background-color: rgba(var(--dory));
  --color: rgba(var(--white));
  --border-color: transparent;
  --overlay-color: var(--inkwell);
}

.buttons[data-type='primary-with-shadow'] {
  --default-background-color: rgba(var(--white));
  --default-text-color: rgba(var(--dory));
  --border-color: transparent;
  --box-shadow: var(--shadow-elevations-3);
  --overlay-color: var(--inkwell);
}

.buttons[data-type='secondary1'] {
  --default-text-color: rgba(var(--dory));
  --background-color: transparent;
  --border-color: var(--color);
  --overlay-color: var(--dirty-seagull);
}

.buttons[data-type='secondary2'] {
  --default-text-color: rgba(var(--dory));
  --background-color: transparent;
  --border-color: rgba(var(--dirty-seagull));
  --overlay-color: var(--dirty-seagull);
}

.buttons[data-type='ghost'] {
  --default-text-color: rgba(var(--dory));
  --border-color: transparent;
  --background-color: transparent;
  --overlay-color: var(--dirty-seagull);
}

/*
 * sizes: https://git.vzbuilders.com/pages/fuji-design/fuji-docs/app/buttonsTypes.html;
 */
.buttons[data-size='xx-small'] {
  --font-size: 12px;
  --block-size: 24px;
  --padding-inline: 16px;
  --gap: 4px;
}

.buttons[data-size='x-small'] {
  --font-size: 12px;
  --block-size: 28px;
  --padding-inline: 20px;
  --gap: 4px;
}

.buttons[data-size='small'] {
  --font-size: 14px;
  --block-size: 32px;
  --padding-inline: 24px;
  --gap: 4px;
}

.buttons[data-size='medium'] {
  --font-size: 14px;
  --block-size: 36px;
  --padding-inline: 28px;
  --gap: 8px;
}

.buttons[data-size='large'] {
  --font-size: 16px;
  --block-size: 44px;
  --padding-inline: 36px;
  --gap: 8px;
}

.buttons[data-size='x-large'] {
  --font-size: 18px;
  --block-size: 56px;
  --padding-inline: 44px;
  --gap: 8px;
}

/*
 * disable: https://git.vzbuilders.com/pages/fuji-design/fuji-docs/app/buttonsInactive.html
 */
.buttons[data-type='primary'][disabled],
.buttons[data-type='primary-with-shadow'][disabled] {
  --background-color: rgba(var(--grey-hair));
  --color: rgba(var(--bob));
}

.buttons[data-type='secondary1'][disabled] {
  --background-color: transparent;
  --color: rgba(var(--bob));
  --border-color: rgba(var(--dirty-seagull));
}

.buttons[data-type='secondary2'][disabled] {
  --background-color: transparent;
  --color: rgba(var(--bob));
  --border-color: rgba(var(--bob)/.5);
}

.buttons[data-type='ghost'][disabled] {
  --background-color: transparent;
  --color: rgba(var(--bob));
  --border-color: transparent;
}

@media (hover: hover) {
  .buttons:hover {
    --overlay-opacity: var(--overlay-opacity-active);
  }

  .buttons[disabled]:hover {
    --overlay-opacity-active: 0;
    --btn-active: scale(1);
  }
}

/*
@font-face {
  font-family: YahooSans;
  src: url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Regular.woff2') format('woff2'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Regular.woff') format('woff'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Regular.ttf') format('ttf');
  font-weight: normal;
  font-style: normal;
  font-display: optional;
}

@font-face {
  font-family: YahooSans;
  src: url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Semibold.woff2') format('woff2'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Semibold.woff') format('woff'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Semibold.ttf') format('ttf');
  font-weight: 600;
  font-style: normal;
  font-display: optional;
}

@font-face {
  font-family: YahooSans;
  src: url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Bold.woff2') format('woff2'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Bold.woff') format('woff'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/Bold.ttf') format('ttf');
  font-weight: 700;
  font-style: normal;
  font-display: optional;
}

@font-face {
  font-family: YahooSans;
  src: url('https://www.yahoo.com/sy/os/fontserver/YahooSans/ExtraBold.woff2') format('woff2'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/ExtraBold.woff') format('woff'),url('https://www.yahoo.com/sy/os/fontserver/YahooSans/ExtraBold.ttf') format('ttf');
  font-weight: 800;
  font-style: normal;
  font-display: optional;
}
*/
`;

export const a11y = `
/* a11y-block-link */
.a11y-block-link {
  --opacity-normal: 0;
  --opacity-active: 0.2;
  --opacity: var(--opacity-normal);
  --overlay-color: var(--inkwell);
  --overlay: rgba(var(--overlay-color) / var(--opacity));
  --transition: background-color 200ms var(--transition-timing-function),
    color 200ms var(--transition-timing-function),
    box-shadow 200ms var(--transition-timing-function);
  --expand: 0px;
  --border-radius: 0px;
}

.a11y-block-link {
  position: relative;
  display: block;
  outline: 0 none;
}

.a11y-block-link::after {
  position: absolute;
  inset-inline-start: 0;
  inset-block-start: 0;
  color: var(--overlay);
  inline-size: 100%;
  block-size: 100%;
  content: '';
  pointer-events: none;
  background: var(--overlay);
  transition: var(--transition);
  box-shadow: 0 0 0 var(--expand);
  border-radius: var(--border-radius);
}

.a11y-block-link:focus-visible {
  --opacity: var(--opacity-active);
}

/* fancy-hover */
.fancy-hover {
  --theme: rgba(var(--anchor-green));
  --text-color-normal: rgba(var(--anchor-green));
  --text-color-active: rgba(var(--white));

  color: var(--text-color-normal);
  font-weight: 400;
  text-decoration: none;
  padding: 0 6px;
  background-image: linear-gradient(to right, var(--theme), var(--theme));
  background-repeat: no-repeat;
  background-size: 0 100%;
  transition: background-size 200ms ease-in-out, color 200ms ease-in-out;
  transform-origin: 0% 50%;
  border-radius: 3px;
  outline: 0 none;
}

.fancy-hover:active {
  transform: scale(0.95);
  transform-origin: 50% 50%;
}

.fancy-hover:focus-visible {
  font-weight: 400;
  color: var(--text-color-active);
  background-size: 100% 100%;
  border-radius: 6px;
}

/* a11y-flex-line */
.a11y-flex-line {
  --position: var(--default-position, relative);
  --line-color: var(--default-line-color, rgba(15 105 255));
  --line-block-size: var(--default-line-block-size, 2px);
  --line-inset-block-end: var(--default-line-inset-block-end, 0px);
  --transition-duration: var(--default-transition-duration, 200ms);
  --transform-origin: var(--default-transform-origin, 50% 50%);

  --scale-x-normal: 0;
  --scale-x-active: 100%;
  --scale-x: var(--scale-x-normal);
}

.a11y-flex-line {
  position: var(--position);
  outline: 0 none;
}

.a11y-flex-line::after {
  content: '';
  position: absolute;
  inset-inline-start: 0;
  inset-block-end: var(--line-inset-block-end);
  inline-size: 100%;
  block-size: var(--line-block-size);
  border-radius: var(--line-block-size);
  background-color: var(--line-color);
  transform: scaleX(var(--scale-x));
  transition: transform var(--transition-duration) ease 100ms;
  transform-origin: var(--transform-origin);
  pointer-events: none;
}

.a11y-flex-line:focus-visible {
  --scale-x: var(--scale-x-active);
}

@media (hover: hover) {
  .a11y-block-link:hover {
    --opacity: var(--opacity-active);
  }

  .fancy-hover:hover {
    font-weight: 400;
    color: var(--text-color-active);
    background-size: 100% 100%;
  }

  .a11y-flex-line:hover {
    --scale-x: var(--scale-x-active);
  }
}

@media (prefers-color-scheme: dark) {
  .a11y-block-link:not(.esc-dark-mode) {
    --overlay-color: var(--dirty-seagull);
  }
}
`;

export const dialog = `
/*
 * dialog
 * https://codepen.io/geckotang/post/dialog-with-animation
 */
.fuji-alerts {
  --color: rgba(var(--batcave));
  --background: rgba(var(--white));
  --padding: 1.5em;
  --margin: 1.5em;

  --close-size: 40px;
  --close-axis-gap: 8px;

  --content-max-inline-size: calc(100vw - var(--padding) * 2 - var(--margin) * 2);
  
  --close-color: #5f6368;
  --close-mask: path('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
}
.fuji-alerts{color:var(--color);background:var(--background);border-radius:.5em;border:0 none;padding:var(--padding);box-shadow:0 0 2px rgba(0,0,0,.05);}
/* ::backdrop neither inherits from nor is inherited by any other elements. No restrictions are made on what properties apply to this pseudo-element. */
.fuji-alerts::backdrop{background-color:rgba(35 42 49/.6);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);}
.fuji-alerts[open],.fuji-alerts[open]::backdrop{animation:fuji-alerts-open 400ms cubic-bezier(.4,0,.2,1) normal;}
.fuji-alerts[close],.fuji-alerts[close]::backdrop{animation:fuji-alerts-close 400ms cubic-bezier(0,0,.2,1) normal;}
.fuji-alerts__form{max-inline-size:var(--content-max-inline-size);block-size:fit-content;block-size:-moz-fit-content;}

.fuji-alerts__close {
  --background-opacity-normal: 0;
  --background-opacity-active: 1;
  --background-opacity: var(--background-opacity-normal);
  --background: rgba(var(--marshmallow)/var(--background-opacity));

  font-size: 0;
  position: absolute;
  inset-inline-end: var(--close-axis-gap);
  inset-block-start: var(--close-axis-gap);
  inline-size: var(--close-size);
  block-size: var(--close-size);
  appearance:none;
  border:0 none;
  border-radius: var(--close-size);
  outline: 0 none;
  background-color: var(--background);
  transition: background-color 200ms ease;
  will-change: background-color;
  z-index: 1;
}

.fuji-alerts__close::before{position:absolute;inset-inline:0 0;inset-block:0 0;margin:auto;inline-size:24px;block-size:24px;content:'';background-color:var(--close-color);clip-path:var(--close-mask);}
.fuji-alerts__close:active{transform:scale(.9);}

.fuji-alerts__close:focus {
  --background-opacity: var(--background-opacity-active);
}

@media (hover: hover) {
  .fuji-alerts__close:hover {
    --background-opacity: var(--background-opacity-active);
  }
}

.fuji-alerts[data-overlay-mode=light]::backdrop{background:#fff;filter:opacity(.66);}

@media (prefers-color-scheme: dark) {
  .fuji-alerts {}
}

@keyframes fuji-alerts-open {
  from {opacity:0;}
  to {opacity:1;}
}
@keyframes fuji-alerts-close {
  from {opacity:1;}
  to {opacity:0;}
}

@media screen and (max-width: 767px) {
  .fuji-alerts[data-type=bottom] {
    inset-block: auto var(--margin);
  }

  .fuji-alerts[data-type=full] {
    --content-max-inline-size: 100%;
    inset-inline:0 auto;
    inset-block:0 auto;
    inline-size: 100%;
    block-size: 100%;
    box-sizing: border-box;
    border-radius: 0;
    max-inline-size: none;
    max-block-size: none;
  }

  .fuji-alerts[data-type=full] .fuji-alerts__form {
    position: absolute;
    inset-inline: 0 0;
    inset-block: 0 0;
    margin: auto;
  }
}
`;