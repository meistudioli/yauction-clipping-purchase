import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';
import {
  colorPalette as _fujiColorPalette,
  buttons as _fujiButtons,
  a11y as _fujiA11y,
  dialog as _fujiDialog
} from './fuji-css.js';
import he from './he.js';
import Mustache from './mustache.js';
import './wc-msc-snackbar.js';

const defaults = {
  carturl: 'https://tw.bid.yahoo.com/cart',
  params: {},
  l10n: {
    cart: 'ADD TO CART',
    buy: 'DIRECT BUY',
    pickSpec: 'Pick {{spec}} please.'
  },
  webservice: {
    info: 'https://api.bid.yahoo.com/api/item/v1/bid/listings/{{merchandiseId}}',
    cart: 'https://tw.bid.yahoo.com/fe/amp/purchase'
  }
};

const booleanAttrs = [];
const objectAttrs = ['params', 'l10n', 'webservice'];
const custumEvents = {
  addToCart: 'yauction-clipping-purchase-add-to-cart-success',
  directBuy: 'yauction-clipping-purchase-direct-buy-success',
  processing: 'yauction-clipping-purchase-processing',
  processFinish: 'yauction-clipping-purchase-process-finish',
  cancel: 'yauction-clipping-purchase-cancel',
  error: 'yauction-clipping-purchase-error'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}
${_fujiColorPalette}
${_fujiButtons}
${_fujiA11y}
${_fujiDialog}

:host{position:relative;inline-size:0;block-size:0;visibility:hidden;overflow:hidden;}

/* custom properties */
.dialog-content {
  --indicator-color: var(--yauction-clipping-purchase-indicator-color, rgba(58 191 186));
  --out-of-stock-text: var(--yauction-clipping-purchase-out-of-stock-text, '缺貨中');
  
  /* a11y-flex-line */
  --default-line-color: var(--indicator-color);
}

.dialog-content .buttons[data-type] {
  --overlay-color: var(--inkwell);
}

.merchandise {
  --vision-scale-normal: 1;
  --vision-scale-active: 1.3;
  --vision-scale: var(--vision-scale-normal);

  --r18-bg: url(https://s.yimg.com/zq/ecimg/ticrf_20220411.svg) rgba(var(--black)/.2) no-repeat 50% 50%/contain;
  --r18-blur: blur(4px);
  --mask-play: path('M5.726,2.22493802 C4.831,1.71893802 4,2.07593802 4,3.20193802 L4,20.789938 C4,21.780938 4.704,22.345938 5.726,21.767938 L21.261,12.972938 C22.211,12.435938 22.211,11.555938 21.261,11.018938 L5.726,2.22493802 Z');
  --background-metroExpress: url(https://s.yimg.com/zq/auc/assets/statics/assets/ico-metro-express__4jQj4AP3xK.svg) rgba(var(--mark-metro-express)) no-repeat 4px -1px / auto 100%;

  --out-of-stock-font-size: 1.125em;
}

.merchandise__mark--buynow {
  --color: rgba(var(--mark-buynow));
  --bgcolor: transparent;
  --border-color: rgba(var(--mark-buynow));
}

.merchandise__intro__title.a11y-block-link {
  --expand: 4px;
  --border-radius: 8px;
}

.spec-fieldset {
  --icon-mask: path('m8 18 4-3.05L16 18l-1.5-4.95 4-2.85h-4.9L12 5l-1.6 5.2H5.5l4 2.85Zm4 4q-2.075 0-3.9-.788-1.825-.787-3.175-2.137-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175 1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138 1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-2q3.35 0 5.675-2.325Q20 15.35 20 12q0-3.35-2.325-5.675Q15.35 4 12 4 8.65 4 6.325 6.325 4 8.65 4 12q0 3.35 2.325 5.675Q8.65 20 12 20Zm0-8Z');

  --slot-opacity-normal: 0;
  --slot-opacity-active: 1;
  --slot-opacity: var(--slot-opacity-normal);
  --slot-background-color: rgba(var(--marshmallow)/var(--slot-opacity));

  --main-gap: 1em;
  --gap: .5em;
  --unit-block-size: 2.25em;
  --row-count: 3;
  --max-block-size: calc(var(--main-gap) + (var(--unit-block-size) * var(--row-count)) - (var(--unit-block-size) / 2) + ((var(--row-count) - 1) * var(--gap)));
  --mask: linear-gradient(to bottom,transparent 0%,black calc(0% + var(--main-gap)),black calc(100% - var(--main-gap)),transparent 100%);
}

.spec-fieldset:focus-within {
  --slot-opacity: var(--slot-opacity-active);
}

.spec-fieldset .buttons[data-type='secondary2'] {
  --background-color: rgba(var(--white));
}

.spec-fieldset .buttons[data-type='secondary2']:not([disabled]) {
  --default-text-color: rgba(var(--batcave));
}

.spec-slots__slot__input:checked~.buttons[data-type='secondary2']:not([disabled]) {
  --border-color: transparent;
  --background-color: linear-gradient(
    86deg,
    rgba(var(--theme-gradient-start)),
    rgba(var(--theme-gradient-end))
  );
}

.spec-slots__slot__input:focus~.buttons {
  --overlay-opacity: var(--overlay-opacity-active);
}

.spec-slots__slot__input:disabled~.buttons {
  --color: rgba(var(--bob));
  --border-color: rgba(var(--bob)/.5);
}

.dialog-content{inline-size:37.5em;}
.main>*+*{margin-block-start:1em;}
.merchandise{display:flex;gap:1em;aspect-ratio:3.32/1;}
.merchandise__vision{block-size:100%;aspect-ratio:1/1;flex-shrink:0;border-radius:.5em;overflow:hidden;outline:0 none;}
.merchandise__vision__img{inline-size:100%;block-size:100%;display:block;object-fit:cover;transition:transform 200ms ease;will-change:transform;transform:scale(var(--vision-scale));}
.merchandise__intro{min-inline-size:0;flex-grow:1;display:flex;flex-direction:column;justify-content:space-around;align-items:flex-start;}
.merchandise__vision:focus-visible{--vision-scale:var(--vision-scale-active);}
.merchandise__intro__store{display:flex;align-items:center;gap:4px;}
.merchandise__intro__store__name{font-size:.875em;color:rgba(var(--gandalf));line-height:1.5;}
.merchandise__intro__store__mark{flex-shrink:0;inline-size:.875em;block-size:.875em;background:url(https://s.yimg.com/zq/auc/assets/statics/assets/ec-good-store__2JCDUZkS62.svg) no-repeat 50% 50%/100% auto;}
.merchandise__intro__store:not([data-rating=''])::after{font-size:10px;color:rgba(var(--white));line-height:1.6;height:16px;content:attr(data-rating);display:block;padding:0 4px;border-radius:10px;background-color:rgba(var(--pebble));}
.merchandise__intro__sales{display:flex;gap:4px;align-items:center;}
.merchandise__intro__price{font-size:1.25em;line-height:1.5;color:rgba(var(--solo-cup));}
.merchandise__intro__original__price{font-size:.875em;color:rgba(var(--gandalf));text-decoration:line-through;}
.merchandise__intro__title{color:rgba(var(--batcave));line-height:1.3;}
.merchandise__mark{font-size:.75em;color:var(--color);background-color:var(--bgcolor);line-height:1.33;height:16px;padding:0 4px;border-radius:3px;border:1px solid var(--border-color);white-space:nowrap;display:inline-block;}
.merchandise__intro__hashtags{display:flex;column-gap:6px;flex-wrap:wrap;max-block-size:2.25em;}
.merchandise__intro__hashtags__a{font-size:.875em;line-height:1.2857;color:rgba(var(--anchor-green));}

.merchandise--r18 .merchandise__vision::after{position:absolute;inset-inline-start:0;inset-block-start:0;aspect-ratio:1/1;content:'';inline-size:100%;background:var(--r18-bg);display:block;}
.merchandise--r18 .merchandise__vision__img{filter:var(--r18-blur);}
.merchandise--soldout .merchandise__vision::before {position:absolute;aspect-ratio:1/1;inline-size:55%;inset-inline:0;inset-block:0;margin:auto;border-radius:100%;font-size:var(--out-of-stock-font-size);line-height:1.333;color:rgba(var(--white));background-color:rgba(var(--black) / 0.4);content:var(--out-of-stock-text);text-align:center;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(2px);-webkit-backdrop-filter:blur(2px);z-index:2;}

.merchandise__vision__metroexpress{font-size:12px;line-height:18px;height:18px;border-radius:3px;padding:0 4px 0 22px;position:absolute;left:6px;top:6px;color:rgba(var(--white));background:var(--background-metroExpress);pointer-events:none;}
.merchandise__vision__video{position:absolute;inset-inline-start:8px;inset-block-end:8px;inline-size:32px;block-size:32px;border-radius:32px;font-size:0;overflow:hidden;pointer-events:none;}
.merchandise__vision__video::before{content:'';position:absolute;inset-inline-start:0;inset-block-start:0;inline-size:100%;block-size:100%;background:linear-gradient(87deg,rgba(var(--theme-gradient-start)),rgba(var(--theme-gradient-end)) 67%,rgba(var(--theme-gradient-end)));opacity:.65;}
.merchandise__vision__video::after {content:'';position:absolute;inset-inline:0;inset-block:0;margin:auto;inline-size:24px;block-size:24px;transform:scale(0.67);clip-path:var(--mask-play);background-color:rgba(var(--white));}

.spec-fieldset{background-color:var(--slot-background-color);box-shadow:0 0 0 .5em var(--slot-background-color);transition:background-color 200ms ease,box-shadow 200ms ease;will-change:background-color,box-shadow;border-radius:.25em;outline:0 none;display:block;}
.spec-legend{inline-size:0;block-size:0;overflow:hidden;visibility:hidden;}
.spec-title{inline-size:100%;color:rgba(var(--batcave));line-height:1.5;display:flex;align-items:center;gap:.25em;margin:0;padding:0;padding-bottom:.5em;border-block-end:1px solid rgba(var(--battleship));}
.spec-title::before{inline-size:1.5em;block-size:1.5em;content:'';display:block;background-color:#fda52a;clip-path:var(--icon-mask);}
.spec-slots{display:flex;flex-wrap:wrap;gap:var(--gap);padding-block:var(--main-gap);}
.spec-slots{box-sizing:border-box;max-block-size:var(--max-block-size);mask-image:var(--mask);-webkit-mask-image:var(--mask);}
.spec-slots__slot{position:relative;inline-size:fit-content;block-size:fit-content;overflow:hidden;}
.spec-slots__slot__input{position:absolute;inset-inline-start:0;inset-block-start:-100%;outline:0 none;}
.spec-slots__slot__input:disabled~.buttons{cursor:not-allowed;}

.submits{display:flex;gap:.5em;padding-block-start:1em;border-block-start:1px solid rgba(var(--dirty-seagull));justify-content:flex-end;margin-block-start:1em;}
.submits .buttons{text-transform:uppercase;}
.submits .buttons:disabled{cursor:not-allowed;}
.submits .submits__addtocart {
  --default-text-color: rgba(var(--batcave));
}

.submits .submits__directbuy {
  --default-background-color: rgba(var(--anchor-green));
}

msc-snackbar {
  --padding-block-end: 1.5em;
  --msc-snackbar-margin-block-end: max(var(--safe-area-bottom), var(--padding-block-end));
}

@media (hover: hover) {
  .merchandise__vision:hover {
    --vision-scale: var(--vision-scale-active);
  }

  .spec-fieldset:hover {
    --slot-opacity: var(--slot-opacity-active);
  }
}

@media screen and (max-width: 767px) {
  .submits .buttons{flex-grow:1;}

  .merchandise {
    --out-of-stock-font-size: .875em;
  }

  msc-snackbar {
    --padding-block-end: 1.25em;
  }

  .spec-fieldset {
    --main-gap: .5em;
  }

  .hide-when-mobile {
    display: none;
  }

  /* rewrite dialog when in mobile view */
  .fuji-alerts {
    --padding: 1.25em;
    --margin: 1.25em;
    --close-size: 36px;
    --close-axis-gap: 2px;
    --content-max-inline-size: 100%;

    border-end-start-radius: 0;
    border-end-end-radius: 0;
    padding-inline: max(var(--safe-area-left), var(--padding)) max(var(--safe-area-right), var(--padding));;
    padding-bottom: max(var(--safe-area-bottom), var(--padding));
  }

  .fuji-alerts[open],.fuji-alerts[close]{animation:revert;}
  .fuji-alerts[open]:modal{animation:fuji-alerts-open-dock 400ms cubic-bezier(.4,0,.2,1) normal;}
  .fuji-alerts[close]:modal{animation:fuji-alerts-close-dock 400ms cubic-bezier(0,0,.2,1) normal;}

  .fuji-alerts:modal {
    inline-size: 100%;
    max-inline-size: 100%;
    box-sizing: border-box;
    inset-block:auto 0;
  }

  @keyframes fuji-alerts-open-dock {
    from {transform:translateY(100%);opacity:0;}
    to {transform:translateY(0%);opacity:1;}
  }

  @keyframes fuji-alerts-close-dock {
    from {transform:translateY(0%);opacity:1;}
    to {transform:translateY(100%);opacity:0;}
  }
}

/* force disable scrollbar */
.overscrolling::-webkit-scrollbar {
  display: none;
}
.overscrolling {
  scrollbar-width: none;
}
</style>

<dialog class="fuji-alerts">
  <form method="dialog" class="fuji-alerts__form dialog-content">
    <button class="fuji-alerts__close" value="cancel">
      confirm
    </button>

    <div class="main"></div>
    
    <div class="submits">
      <button
        class="buttons submits__addtocart"
        data-type="secondary1"
        data-size="large"
        value="cart"
      >
        ${defaults.l10n.cart}
      </button>
      <button
        class="buttons submits__directbuy"
        data-type="primary"
        data-size="large"
        value="buy"
      >
        ${defaults.l10n.buy}
      </button>
    </div>
  </form>
  
  <msc-snackbar>
    <script type="application/json">
      {
        "dismiss": {
          "hidden": false
        }
      }
    </script>
  </msc-snackbar>
</dialog>
`;

const templateMain = document.createElement('template');
templateMain.innerHTML = `
  <div class="merchandise {{#isAdult}}merchandise--r18{{/isAdult}} {{#outOfStock}}merchandise--soldout{{/outOfStock}}">
    <a href="{{url}}" class="merchandise__vision a11y-block-link force-radius esc-dark-mode" title="{{title.label}}" aria-label="{{title.label}}" target="yauction-clipping-purchase">
      <img class="merchandise__vision__img" src="{{image}}" alt="{{title.label}}" width="1" height="1" />
      {{#hasVideo}}
      <em class="merchandise__vision__video">video</em>
      {{/hasVideo}}
      {{#metroExpress}}
      <em class="merchandise__vision__metroexpress">{{metroExpress}}</em>
      {{/metroExpress}}
    </a>
    <div class="merchandise__intro">
      <a href="{{store.url}}" class="merchandise__intro__store a11y-flex-line" data-rating="" title="{{store.label}}" aria-label="{{store.label}}" target="yauction-clipping-purchase">
        <span class="merchandise__intro__store__name text-overflow">{{store.name}}</span>
        <mark class="merchandise__intro__store__mark stuff"></mark>
      </a>
      <a href="{{url}}" class="merchandise__intro__title line-clampin a11y-flex-line" title="{{title.label}}" aria-label="{{title.label}}" target="yauction-clipping-purchase">
        <mark class="merchandise__mark merchandise__mark--buynow">直購</mark>
        {{title.content}}
      </a>

      {{#showHashtags}}
      <div class="merchandise__intro__hashtags line-clampin hide-when-mobile">
        {{#hashtags}}
        <a href="{{url}}" class="merchandise__intro__hashtags__a a11y-flex-line" target="yauction-clipping-purchase">{{content}}</a>
        {{/hashtags}}
      </div>
      {{/showHashtags}}

      <div class="merchandise__intro__sales">
        <em class="merchandise__intro__price" part="price">{{price}}</em>
        {{#originalPrice}}
        <em class="merchandise__intro__original__price text-overflow">{{originalPrice}}</em>
        {{/originalPrice}}
      </div>
    </div>
  </div>

  {{#hasSpecs}}
    {{#specs}}
    <fieldset class="spec-fieldset" data-key="{{key}}">
      <legend class="spec-legend">pick spec {{title}}</legend>
      <p class="spec-title">{{title}}</p>
      <div class="spec-slots overscrolling">
        {{#slots}}
        <label class="spec-slots__slot">
          {{#disabled}}
          <input class="spec-slots__slot__input" type="checkbox" name="{{name}}" value="{{value}}" data-key="{{key}}" data-disabled-forever="yes" disabled />
          {{/disabled}}

          {{^disabled}}
          <input class="spec-slots__slot__input" type="checkbox" name="{{name}}" value="{{value}}" data-key="{{key}}" />
          {{/disabled}}
          
          <span class="buttons" data-type="secondary2" data-size="medium">
            {{title}}
          </span>
        </label>
        {{/slots}}
      </div>
    </fieldset>
    {{/specs}}
  {{/hasSpecs}}
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--yauction-clipping-purchase-indicator-color',
      syntax: '<color>',
      inherits: true,
      initialValue: 'rgba(58 191 186)'
    });
  } catch (err) {
    console.warn(`yauction-clipping-purchase: ${err.message}`);
  }
}


const productData = {}; // store product data

export class YauctionClippingPurchase extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      product: {},
      processing: false,
      iid: '',
      fetchController: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      dialog: this.shadowRoot.querySelector('dialog'),
      main: this.shadowRoot.querySelector('.main'),
      form: this.shadowRoot.querySelector('form'),
      price: this.shadowRoot.querySelector('.merchandise__intro__price'),
      fieldsets: Array.from(this.shadowRoot.querySelectorAll('fieldset')),
      btnCart: this.shadowRoot.querySelector('.submits__addtocart'),
      btnBuy: this.shadowRoot.querySelector('.submits__directbuy'),
      snackbar: this.shadowRoot.querySelector('msc-snackbar'),
      submits: Array.from(this.shadowRoot.querySelectorAll('.submits button'))
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new YauctionClippingPurchase(config)
    };

    // evts
    this._onButtonClick = this._onButtonClick.bind(this);
    this._onCancel = this._onCancel.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  async connectedCallback() {
    const { dialog } = this.#nodes;
    const { config, error } = await _wcl.getWCConfig(this);

    if (error) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${error}`);
      this.remove();
      return;
    } else {
      this.#config = {
        ...this.#config,
        ...config
      };
    }

    // upgradeProperty
    Object.keys(defaults).forEach((key) => this.#upgradeProperty(key));

    // evts
    this.#data.controller = new AbortController();
    const signal = this.#data.controller.signal;
    dialog.addEventListener('cancel', this._onCancel, { signal });
    dialog.addEventListener('change', this._onChange, { signal });
    dialog.addEventListener('click', this._onButtonClick, { signal });
  }

  disconnectedCallback() {
    if (this.#data?.controller) {
      this.#data.controller.abort();
    }
  }

  #format(attrName, oldValue, newValue) {
    const hasValue = newValue !== null;

    if (!hasValue) {
      if (booleanAttrs.includes(attrName)) {
        this.#config[attrName] = false;
      } else {
        this.#config[attrName] = defaults[attrName];
      }
    } else {
      switch (attrName) {
        case 'carturl':
          this.#config[attrName] = newValue;
          break;

        case 'params':
        case 'l10n':
        case 'webservice': {
          let values;
          try {
            values = JSON.parse(newValue);
          } catch(err) {
            console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
            values = { ...defaults[attrName] };
          }
          this.#config[attrName] = values;
          break;
        }
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!YauctionClippingPurchase.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'l10n': {
        const { btnCart, btnBuy } = this.#nodes;
        const { cart, buy } = {
          ...defaults.l10n,
          ...this.l10n
        };

        btnCart.textContent = cart;
        btnBuy.textContent = buy;
        break;
      }
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // YauctionClippingPurchase.observedAttributes
  }

  #upgradeProperty(prop) {
    let value;

    if (YauctionClippingPurchase.observedAttributes.includes(prop)) {
      if (Object.prototype.hasOwnProperty.call(this, prop)) {
        value = this[prop];
        delete this[prop];
      } else {
        if (booleanAttrs.includes(prop)) {
          value = (this.hasAttribute(prop) || this.#config[prop]) ? true : false;
        } else if (objectAttrs.includes(prop)) {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : JSON.stringify(this.#config[prop]);
        } else {
          value = this.hasAttribute(prop) ? this.getAttribute(prop) : this.#config[prop];
        }
      }

      this[prop] = value;
    }
  }

  set carturl(value) {
    if (value) {
      this.setAttribute('carturl', value);
    } else {
      this.removeAttribute('carturl');
    }
  }

  get carturl() {
    return this.#config.carturl;
  }

  set params(value) {
    if (value) {
      const newValue = {
        ...defaults.params,
        ...this.params,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('params', JSON.stringify(newValue));
    } else {
      this.removeAttribute('params');
    }
  }

  get params() {
    return this.#config.params;
  }

  set l10n(value) {
    if (value) {
      const newValue = {
        ...defaults.l10n,
        ...this.l10n,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('l10n', JSON.stringify(newValue));
    } else {
      this.removeAttribute('l10n');
    }
  }

  get l10n() {
    return this.#config.l10n;
  }

  set webservice(value) {
    if (value) {
      const newValue = {
        ...defaults.webservice,
        ...this.webservice,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('webservice', JSON.stringify(newValue));
    } else {
      this.removeAttribute('webservice');
    }
  }

  get webservice() {
    return this.#config.webservice;
  }

  get productInfo() {
    return this.#data.product;
  }

  get processing() {
    return this.#data.processing;
  }

  get open() {
    return this.#nodes.dialog.open;
  }

  #fireEvent(evtName, detail) {
    this.dispatchEvent(new CustomEvent(evtName,
      {
        bubbles: true,
        composed: true,
        ...(detail && { detail })
      }
    ));
  }

  #prepareClose(type) {
    const { dialog, snackbar } = this.#nodes;

    if (!this.open) {
      return;
    }
    
    snackbar.active = false;
    dialog.addEventListener('animationend',
      () => {
        dialog.returnValue = type;
        dialog.removeAttribute('close');
        dialog.close();

        if (type === 'cancel') {
          this.#fireEvent(custumEvents.cancel);
        }
      }
    , { once:true });

    dialog.toggleAttribute('close', true);
  }

  #purify(str) {
    return he.decode(str).replace(/"|'/g, '').trim();
  }

  #dollarFormat(input, sign) {
    const number = parseInt(input, 10);
    let s = typeof sign !== 'undefined' ? sign : '$';
    if (!Number.isInteger(number)) {
      return '';
    }

    return s + number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // add ',' at every 3 digit
  }

  #normalizer(source = {}) {
    const {
      id = '',
      type = '',
      title = '',
      hashtags = [],
      seller: {
        ecid = '',
        storeName = ''
      } = {},
      price: {
        selling = '0',
        original,
        isMultiplePrice =  false
      } = {},
      images = [],
      product: {
        id: productId = '',
        hasSpecs = false,
        specs: specsOriginal = [],
        models: modelsOriginal = []
      } = {},
      category: {
        attributes = []
      } = {},
      video: {
        url:videoUrl = ''
      } = {},
      quantity: {
        stock = 0
      } = {},
      shipments = []
    } = source;

    if (type === 'bid') {
      throw new Error(`${_wcl.classToTagName(this.constructor.name)}: doesn't support bid product.`);
    }

    const imgs = images.reduce(
      (acc, image) => {
        const imageObject = image.reduce(
          (acc, unit) => {
            const { rule, url } = unit;

            acc[rule] = url;
            return acc;
          }
        , {});

        return acc.concat(imageObject);
      }
    , []);

    const specs = specsOriginal.reduce(
      (acc, spec, idx) => {
        const {
          id:specId = '',
          title = '',
          values = []
        } = spec;

        return acc.concat(
          {
            id: specId,
            key: idx,
            title: he.decode(title).trim(),
            slots: values.reduce(
              (acc, unit) => {
                const { id = '', title = '', enable = false } = unit;

                return !enable ? acc : acc.concat({
                  title: he.decode(title).trim(),
                  name: specId,
                  value: id,
                  disabled: false
                });
              }
            , [])
          }
        );
      }
    , []);

    const specId = specs[0].id;
    const prices = [];
    const models = modelsOriginal.reduce(
      (acc, model) => {
        const {
          id = '',
          quantity = 0,
          selling = '0',
          enable = false,
          combinations = []
        } = model;

        if (enable) {
          const index = combinations.findIndex(({ specNameId }) => specNameId === specId);
          const main = combinations.splice(index, 1);
          const key = `${main[0].specValueId}-${combinations[0]?.specValueId || ''}`;

          acc[key] = {
            id,
            quantity,
            price: this.#dollarFormat(selling)
          };

          prices.push(+selling);
        }

        return acc;
      }
    , {});

    // disabled forever
    specs.forEach(
      (spec, idx) => {
        const { slots } = spec;
        const slotsNext = (specs.length > 1)
          ? specs[(idx + 1) % specs.length].slots
          : [];

        const slotsCorrect = slots.reduce(
          (acc, slot) => {
            const { value } = slot;

            if (slotsNext.length) {
              const disabled = slotsNext.reduce(
                (acc, { value:V }) => {
                  const modelId = idx === 0 ? `${value}-${V}` : `${V}-${value}`;
                  const flag = models?.[modelId]?.quantity === 0;
                  
                  return acc && flag;
                }
              , true);

              return acc.concat({
                ...slot,
                disabled
              });
            } else {
              const modelId = `${value}-`;

              return acc.concat({
                ...slot,
                disabled: models?.[modelId]?.quantity === 0
              });
            }
          }
        , []);

        spec.slots = slotsCorrect;
      }
    );

    let price;
    if (isMultiplePrice) {
      prices.sort((a, b) => a - b);
      price = `${this.#dollarFormat(prices[0])} - ${this.#dollarFormat(prices.at(-1))}`;
    } else {
      price = this.#dollarFormat(selling);
    }

    return {
      id,
      productId,
      title: {
        content: he.decode(title).trim(),
        label: this.#purify(title)
      },
      url: `https://tw.bid.yahoo.com/item/${id}`,
      image: imgs?.[0]?.['crop01'] || 'https://s.yimg.com/ma/auc/item/icon/item-no-image.svg',
      price,
      ...(original && !isMultiplePrice && { originalPrice: this.#dollarFormat(original) }),
      hasSpecs,
      specs,
      models,
      store: {
        name: he.decode(storeName).trim(),
        label: this.#purify(storeName),
        url: `https://tw.bid.yahoo.com/booth/${ecid}`
      },
      isAdult: attributes.findIndex(({ values = [] }) => values.indexOf('限制級') !== -1) !== -1,
      hasVideo: !!videoUrl,
      outOfStock: stock === 0,
      ...(hashtags.length && {
        showHashtags: true,
        hashtags: hashtags.reduce(
          (acc, hashtag) => {
            return acc.concat(
              {
                content: `#${hashtag}`,
                url: `https://tw.bid.yahoo.com/search/auction/product?ht=${hashtag}`
              }
            );
          }
        , [])
      }),
      metroExpress: shipments.find(({ name }) => name === 'metroExpressDelivery')?.shipFrom?.city || ''
    };
  }

  #prepareFetch(timeout = 5000) {
    clearTimeout(this.#data.iid);

    // fetch abort
    if (this.#data.fetchController?.abort) {
      this.#data.fetchController.abort();
    }

    this.#data.fetchController = new AbortController();
    const signal = this.#data.fetchController.signal;

    // timeout
    this.#data.iid = setTimeout(() => this.#data.fetchController.abort(), timeout);

    return signal;
  }

  async #fetchProductInfo(id) {
    if (!productData[id]) {
      const { info } = this.webservice;

      this.#data.processing = true;
      this.#fireEvent(custumEvents.processing);
      const signal = this.#prepareFetch();

      try {
        const infoUrl = info.replace(/{{merchandiseId}}/g, id);
        const base = !/^http(s)?:\/\/.*/.test(infoUrl) ? window.location.origin : undefined

        const fetchUrl = new URL(infoUrl, base);
        const params = {
          ...this.params,
          id
        };
        Object.keys(params).forEach((key) => fetchUrl.searchParams.set(key, params[key]));

        const response = await fetch(
          fetchUrl.toString(),
          {
            headers: {
              'content-type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
            signal
          }
        )
          .then(
            (response) => {
              if (!response.ok) {
                throw new Error('Network response was not OK');
              }

              return response.json();
            }
          );

        productData[id] = this.#normalizer(response);
      } catch(err) {
        console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
        this.#fireEvent(custumEvents.error, { message:'fetch product information failed.' });
      }

      this.#data.processing = false;
      this.#fireEvent(custumEvents.processFinish);
    }

    if (!productData[id]) {
      this.#prepareClose('cancel');

      console.warn(`${_wcl.classToTagName(this.constructor.name)}: can't gather product information.`);
      return;
    }

    const data = { ...productData[id] };
    const { main, dialog } = this.#nodes;
    const templateString = Mustache.render(templateMain.innerHTML, data);

    main.replaceChildren();
    main.insertAdjacentHTML('afterbegin', templateString);
    
    this.#nodes.price = this.shadowRoot.querySelector('.merchandise__intro__price');
    this.#nodes.fieldsets = Array.from(this.shadowRoot.querySelectorAll('fieldset'));
    this.#nodes.submits.forEach((button) => button.disabled = data.outOfStock);
    this.#data.product = data;

    if (!this.open) {
      dialog.showModal();
    } 
  }

  async #fetchAddToCart() {
    const {
      product: {
        id,
        productId,
        hasSpecs,
        specs,
        models
      }
    } = this.#data;
    const { form, snackbar } = this.#nodes;
    const formData = new FormData(form);
    let flag = false;
    let fd = Object.fromEntries(formData.entries());

    // specs
    let selectedModelId;
    if (hasSpecs) {
      const missingSpecIndex = specs.findIndex(({ id }) => !fd?.[id]);
      
      if (missingSpecIndex !== -1) {
        const replaceKey = '{{spec}}';
        const message = `${this.l10n.pickSpec}${this.l10n.pickSpec.indexOf(replaceKey) === -1 ? ` ${replaceKey}` : ''}`;

        snackbar.label = message.replace(/{{spec}}/g, specs[missingSpecIndex].title);
        snackbar.active = true;

        return flag;
      }

      selectedModelId = specs.map(({ id }) => fd?.[id] || '').join('-');
      if (selectedModelId.indexOf('-') === -1) {
        // fix specs.length === 1
        selectedModelId += '-';
      }
    } else {
      selectedModelId = `${specs[0].slots[0].value}-`;
    }

    // data prepare
    fd = {
      ...this.params,
      ...fd,
      mid: id, // merchandise id
      productId,
      quantity: 1,
      modelId: models[selectedModelId].id
    };

    // add to cart
    this.#data.processing = true;
    this.#fireEvent(custumEvents.processing);
    const signal = this.#prepareFetch();

    try {
      const { cart } = this.webservice;
      const base = !/^http(s)?:\/\/.*/.test(cart) ? window.location.origin : undefined
      const fetchUrl = new URL(cart, base);

      Object.keys(fd).forEach((key) => fetchUrl.searchParams.set(key, fd[key]));

      await fetch(
        fetchUrl.toString(),
        {
          headers: {
            'content-type': 'application/json'
          },
          method: 'GET',
          mode: 'cors',
          credentials: 'include',
          signal
        }
      )
        .then(
          (response) => {
            if (!response.ok) {
              throw new Error('Network response was not OK');
            }

            return response.json();
          }
        );

      flag = true;
    } catch(err) {
      console.warn(`${_wcl.classToTagName(this.constructor.name)}: ${err.message}`);
      this.#fireEvent(custumEvents.error, { message:'fetch add to cart failed.' });
    }

    this.#data.processing = false;
    this.#fireEvent(custumEvents.processFinish);

    return flag;
  }

  _onCancel(evt) {
    evt.preventDefault();
    this.#prepareClose('cancel');
  }

  async _onButtonClick(evt) {
    const button = evt.target.closest('button');

    if (!button || this.#data.processing) {
      return;
    }

    this.#nodes.snackbar.active = false;
    evt.preventDefault();

    const type = button.value;
    switch (type) {
      case 'buy':
        if (await this.#fetchAddToCart()) {
          this.#fireEvent(custumEvents.directBuy);
          this.#prepareClose(type);

          if (this.carturl.length) {
            location.href = this.carturl;
          }
        }
        break;

      case 'cart': {
        if (await this.#fetchAddToCart()) {
          this.#fireEvent(custumEvents.addToCart);
          this.#prepareClose(type);
        }
        break;
      }

      case 'cancel':
        this.#prepareClose(type);
        break;
    }
  }

  _onChange(evt) {
    const {
      product: {
        specs,
        models,
        price: priceOriginal
      }
    } = this.#data;
    const { price, fieldsets, main, form, snackbar } = this.#nodes;
    const target = evt.target.closest('input');
    const key = +target.dataset.key;
    const formData = new FormData(form);
    const fd = Object.fromEntries(formData.entries());

    snackbar.active = false;

    // specs
    if (target.checked) {
      // uncheck others
      Array.from(fieldsets[key].querySelectorAll(`input:checked:not([value="${target.value}"])`))
        .forEach((input) => input.checked = false);

      if (specs.length > 1) {
        const value = target.value;

        Array.from(fieldsets[(key + 1) % specs.length].querySelectorAll('input'))
          .forEach(
            (input) => {
              const modelId = (key === 0) ? `${value}-${input.value}` : `${input.value}-${value}`;
              input.disabled = models[modelId].quantity === 0;
            }
          );
      }
    } else {
      // clear disabled
      Array.from(main.querySelectorAll('input:disabled:not([data-disabled-forever])'))
        .forEach(
          (input) => {
            const key = +input.dataset.key;
            const value = input.value;
            let modelId;

            if (specs.length > 1) {
              modelId = (key === 0) ? `${value}-${fd[specs[1].id] || ''}` : `${fd[specs[0].id] || ''}-${value}`;
              input.disabled = models?.[modelId] && models?.[modelId].quantity === 0;
            }
          }
        );
    }

    // price
    let selectedModelId = specs.map(({ id }) => fd[id] || '').join('-');
    if (selectedModelId.indexOf('-') === -1) {
      // fix specs.length === 1
      selectedModelId += '-';
    }
    price.textContent = models?.[selectedModelId]?.price || priceOriginal;
  }

  show(id) {
    this.#nodes.snackbar.active = false;
    this.#fetchProductInfo(id);
  }

  dismiss() {
    if (this.open) {
      this.#prepareClose('cancel');
    }
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('YauctionClippingPurchase');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('YauctionClippingPurchase'), YauctionClippingPurchase);
}