import { _wcl } from './common-lib.js';
import { _wccss } from './common-css.js';

const defaults = {
  active: false,
  stack: false,
  label: 'messages',
  action: {
    content: 'action',
    hidden: true,
    params: {}
  },
  dismiss: {
    auto: true,
    hidden: true,
    duration: 5000
  }
};
const booleanAttrs = ['active', 'stack'];
const objectAttrs = ['action', 'dismiss'];

const custumEvents = {
  click: 'msc-snackbar-action-click',
  dissmiss: 'msc-snackbar-dissmiss'
};

const template = document.createElement('template');
template.innerHTML = `
<style>
${_wccss}

:host {
  margin-inline: var(--msc-snackbar-margin-inline, 16px);
  margin-block-end: var(--msc-snackbar-margin-block-end, 16px);
}
:host{position:fixed;inset-inline:0;inset-block-end:0;display:flex;pointer-events:none;user-select:none;-webkit-user-select:none;z-index:10;justify-content:center;}

.main {
  --action-color: var(--msc-snackbar-action-color, #bb86fc);

  /* something you dont wnat clients change */
  --flex-direction: row;
  --label-align-self: auto;
  --actions-align-self: auto;

  --min-inline-size: 344px;
  --max-inline-size1: min(672px, calc(100vw - (var(--inset-inline-start) * 2)));
  --max-inline-size: min(672px, 100%);

  --main-scale-normal: scale(.8);
  --main-scale-active: scale(1);
  --main-scale: var(--main-scale-normal);

  --main-opacity-normal: 0;
  --main-opacity-active: 1;
  --main-opacity: var(--main-opacity-normal);

  --main-pointer-events-normal: none;
  --main-pointer-events-active: auto;
  --main-pointer-events: var(--main-pointer-events-normal);

  --transition-duration: 60ms;
  --dismiss-bgc-normal: transparent;
  --dismiss-bgc-active: rgba(232 234 237/.04);
  --dismiss-bgc-tapped: rgba(232 234 237/.1);
  --dismiss-bgc: var(--dismiss-bgc-normal);

  --dismiss-color-normal: #9aa0a6;
  --dismiss-color-active: #e8eaed;
  --dismiss-color: var(--dismiss-color-normal);

  --mask-dismiss: path('M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z');
  --actions-margin-block-end: 0;
}

:host(.msc-snackbar--leading) {
  justify-content: flex-start;
}

:host([active]) .main {
  --main-opacity: var(--main-opacity-active);
  --main-scale: var(--main-scale-active);
  --main-pointer-events: var(--main-pointer-events-active);
}

:host([stack]) .main {
  --flex-direction: column;
  --label-align-self: flex-start;
  --actions-align-self: flex-end;
  --actions-margin-block-end: 8px
}

.main{min-inline-size:var(--min-inline-size);max-inline-size:var(--max-inline-size);background-color:#333;border-radius:4px;box-sizing:border-box;display:flex;flex-direction:var(--flex-direction);align-items:center;justify-content:flex-start;box-shadow:0 3px 5px -1px rgba(0 0 0/.2),0 6px 10px 0 rgba(0 0 0/.14),0 1px 18px 0 rgba(0 0 0/.12);pointer-events:var(--main-pointer-events);}
.main{opacity:var(--main-opacity);transform:var(--main-scale);transition:opacity .15s cubic-bezier(0,0,.2,1),transform .15s cubic-bezier(0,0,.2,1);will-change:opacity,transform;}
.snackbar__label{padding:14px 16px;flex-grow:1;min-inline-size:0;align-self:var(--label-align-self);}
.snackbar__label__p{font-size:14px;line-height:1.4285;color:rgba(255 255 255/.87);letter-spacing:.25px;}
.snackbar__actions{display:flex;flex-shrink:0;margin-inline-end:8px;margin-block-end:var(--actions-margin-block-end);align-items:center;align-self:var(--actions-align-self);}

.snackbar__buttons{background:transparent;border-radius:unset;display:flex;align-items:center;justify-content:center;border:0 none;outline:0 none;padding:0;margin:0;}
.snackbar__action{color:var(--action-color);font-weight:500;block-size:36px;font-size:14px;appearance:none;border:0 none;padding-inline:8px;letter-spacing:1.25px;text-decoration:none;text-transform:uppercase;}
.snackbar__action[hidden]{display:none;}
.snackbar__dismiss{font-size:0;inline-size:36px;block-size:36px;border-radius:36px;background-color:var(--dismiss-bgc);margin-inline-start:8px;transition:background-color var(--transition-duration) linear;will-change:background-color;}
.snackbar__dismiss::before{inline-size:24px;block-size:24px;content:'';display:block;background-color:var(--dismiss-color);clip-path:var(--mask-dismiss);transform:scale(.75);transition:color var(--transition-duration) linear;will-change:color;}
.snackbar__dismiss[hidden]{display:none;}
.snackbar__dismiss:focus-visible {
  --dismiss-color: var(--dismiss-color-active);
  --dismiss-bgc: var(--dismiss-bgc-active);
}

.snackbar__dismiss:active {
  --dismiss-bgc: var(--dismiss-bgc-tapped);
}

@media (hover: hover) {
  .snackbar__dismiss:hover {
    --dismiss-color: var(--dismiss-color-active);
    --dismiss-bgc: var(--dismiss-bgc-active);
  }

  .snackbar__dismiss:active:hover {
    --dismiss-bgc: var(--dismiss-bgc-tapped);
  }
}
</style>

<div class="main">
  <div class="snackbar__label">
    <p class="snackbar__label__p line-clampin">
      ${defaults.label}
    </p>
  </div>
  <div class="snackbar__actions">
    <button type="button" class="snackbar__buttons snackbar__action" data-type="action">
      ${defaults.action.content}
    </button>
    <button type="button" class="snackbar__buttons snackbar__dismiss" data-type="dismiss">
      close
    </button>
  </div>
</div>
`;

// Houdini Props and Vals
if (CSS?.registerProperty) {
  try {
    CSS.registerProperty({
      name: '--msc-snackbar-action-color',
      syntax: '<color>',
      inherits: true,
      initialValue: '#bb86fc'
    });
  } catch(err) {
    console.warn(`msc-snackbar: ${err.message}`);
  }
}

export class MscSnackbar extends HTMLElement {
  #data;
  #nodes;
  #config;

  constructor(config) {
    super();

    // template
    this.attachShadow({ mode: 'open', delegatesFocus: false });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // data
    this.#data = {
      controller: '',
      iid: ''
    };

    // nodes
    this.#nodes = {
      styleSheet: this.shadowRoot.querySelector('style'),
      main: this.shadowRoot.querySelector('.main'),
      label: this.shadowRoot.querySelector('.snackbar__label__p'),
      btnAction: this.shadowRoot.querySelector('.snackbar__action'),
      btnDissmiss: this.shadowRoot.querySelector('.snackbar__dismiss')
    };

    // config
    this.#config = {
      ...defaults,
      ...config // new MscSnackbar(config)
    };

    // evts
    this._onMouseAct = this._onMouseAct.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  async connectedCallback() {
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
    this.#nodes.main.addEventListener('mouseover', this._onMouseAct, { signal });
    this.#nodes.main.addEventListener('mouseout', this._onMouseAct, { signal });
    this.#nodes.main.addEventListener('click', this._onClick, { signal });
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
        case 'active':
        case 'stack':
          this.#config[attrName] = true;
          break;

        case 'label':
          this.#config[attrName] = newValue;
          break;

        case 'action':
        case 'dismiss':
          this.#config[attrName] = JSON.parse(newValue);
          break;
      }
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (!MscSnackbar.observedAttributes.includes(attrName)) {
      return;
    }

    this.#format(attrName, oldValue, newValue);

    switch (attrName) {
      case 'label':
        this.#nodes.label.textContent = this.label;
        break;

      case 'action': {
        const { btnAction } = this.#nodes;
        btnAction.textContent = this.action.content || defaults.action.content;
        btnAction.hidden = this.action.hidden;
        break;
      }

      case 'dismiss':
        this.#nodes.btnDissmiss.hidden = this.dismiss.hidden;
        break;
    }
  }

  static get observedAttributes() {
    return Object.keys(defaults); // MscSnackbar.observedAttributes
  }

  #upgradeProperty(prop) {
    let value;

    if (MscSnackbar.observedAttributes.includes(prop)) {
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

  set active(value) {
    clearTimeout(this.#data.iid);
    this.toggleAttribute('active', Boolean(value));

    if (this.active) {
      this.#activeAutoDissmiss();
    }
  }

  get active() {
    return this.#config.active;
  }

  set stack(value) {
    this.toggleAttribute('stack', Boolean(value));
  }

  get stack() {
    return this.#config.stack;
  }

  set label(value) {
    if (value) {
      this.setAttribute('label', value);
    } else {
      this.removeAttribute('label');
    }
  }

  get label() {
    return this.#config.label;
  }

  set action(value) {
    if (value) {
      const newValue = {
        ...defaults.action,
        ...this.action,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('action', JSON.stringify(newValue));
    } else {
      this.removeAttribute('action');
    }
  }

  get action() {
    return this.#config.action;
  }

  set dismiss(value) {
    if (value) {
      const newValue = {
        ...defaults.dismiss,
        ...this.dismiss,
        ...(typeof value === 'string' ? JSON.parse(value) : value)
      };
      this.setAttribute('dismiss', JSON.stringify(newValue));
    } else {
      this.removeAttribute('dismiss');
    }
  }

  get dismiss() {
    return this.#config.dismiss;
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

  #activeAutoDissmiss() {
    const {
      auto = true,
      duration = defaults.dismiss.duration
    } = this.dismiss;

    clearTimeout(this.#data.iid);

    if (auto && _wcl.isNumeric(duration)) {
      this.#data.iid = setTimeout(
        () => {
          this.#nodes.btnDissmiss.click();
        }
      , duration);
    }
  }

  _onMouseAct(evt) {
    clearTimeout(this.#data.iid);

    if (evt.type === 'mouseout') {
      this.#activeAutoDissmiss();
    }
  }

  _onClick(evt) {
    const button = evt.target.closest('button');

    if (!button) {
      return;
    }

    evt.preventDefault();
    clearTimeout(this.#data.iid);

    if (button.dataset.type === 'action') {
      this.#fireEvent(custumEvents.click, { params: { ...this.action.params } });
    } else {
      this.#fireEvent(custumEvents.dissmiss);
    }

    this.active = false;
  }
}

// define web component
const S = _wcl.supports();
const T = _wcl.classToTagName('MscSnackbar');
if (S.customElements && S.shadowDOM && S.template && !window.customElements.get(T)) {
  window.customElements.define(_wcl.classToTagName('MscSnackbar'), MscSnackbar);
}