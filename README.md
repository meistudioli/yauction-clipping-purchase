# yauction-clipping-purchase

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/yauction-clipping-purchase) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/23346/branches/706328/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=23346&bid=706328)

&lt;yauction-clipping-purchase /> provides 「add to cart」&amp;「direct buy」features for commerce site wiich means developers could adopt these features in any web pages they liked.（&lt;yauction-clipping-purchase /> adopts [TW Yahoo! Auction](https://tw.bid.yahoo.com/)'s product data）

## Vision

Here comes &lt;yauction-clipping-purchase /> rised vision. With this clear view, vistors could add product to cart or buy it directly.

![<msc-zoom />](https://blog.lalacube.com/mei/img/wc_visions/yauction-clipping-purchase.png)

## Basic Usage

&lt;yauction-clipping-purchase /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;yauction-clipping-purchase />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-yauction-clipping-purchase.js">        
</script>
```

- Structure

Put &lt;yauction-clipping-purchase /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<yauction-clipping-purchase>
  <script type="application/json">
    {
      "carturl": "https://tw.bid.yahoo.com/cart",
      "l10n": {
        "cart": "ADD TO CART",
        "buy": "DIRECT BUY",
        "pickSpec": "Pick「{{spec}}」please.",
        "addToCartSuccess": "Add to cart success."
      },
      "params": {
        "id": "mei",
        "sex": "M"
      },
      "webservice": {
        "info": "https://your-domain/getProductInformation",
        "cart": "https://your-domain/getAddToCart"
      }
    }
  </script>
</yauction-clipping-purchase>
```

Otherwise, developers could also choose remoteconfig to fetch config for &lt;yauction-clipping-purchase />.

```html
<yauction-clipping-purchase
  remoteconfig="https://your-domain/api-path"
>
</yauction-clipping-purchase>
```

## JavaScript Instantiation

&lt;yauction-clipping-purchase /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { YauctionClippingPurchase } from 'https://your-domain/wc-yauction-clipping-purchase.js';

// use DOM api
const nodeA = document.createElement('yauction-clipping-purchase');
document.body.appendChild(nodeA);
nodeA.params = {
  id: 'mei',
  sex: 'M'
};
nodeA.show('100450639430');

// new instance with Class
const nodeB = new YauctionClippingPurchase();
document.body.appendChild(nodeB);
nodeB.params = {
  id: 'mei',
  sex: 'M'
};
nodeB.show('101395118170');

// new instance with Class & default config
const config = {
  carturl: 'https://tw.bid.yahoo.com/cart',
  params: {},
  l10n: {
    cart: 'ADD TO CART',
    buy: 'DIRECT BUY',
    pickSpec: 'Pick {{spec}} please.',
    addToCartSuccess: 'Add to cart success.'
  },
  webservice: {
    info: 'https://your-domain/getProductInformation',
    cart: 'https://your-domain/getAddToCart'
  }
};
const nodeC = new YauctionClippingPurchase(config);
document.body.appendChild(nodeC);
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;yauction-clipping-purchase />'s looking.

```html
<style>
yauction-clipping-purchase {
  --yauction-clipping-purchase-indicator-color: rgba(58 191 186/.8);
  --yauction-clipping-purchase-out-of-stock-text: '缺貨中';
}
</style>
```

Otherwise, apply pseudo class `::part(price)` to direct style price element.

```html
<style>
yauction-clipping-purchase::part(price) {
  font-size: 36px;
  color: #000;
  line-height: 1.5;
}
</style>
```

## Attributes

&lt;yauction-clipping-purchase /> supports some attributes to let it become more convenience & useful.

- **carturl**

Set carturl for &lt;yauction-clipping-purchase />. It will redirect to this url when 「direct buy」 button pressed. Default is `https://tw.bid.yahoo.com/cart` (not set).

```html
<yauction-clipping-purchase
  carturl="https://tw.bid.yahoo.com/cart"
>
  ...
</yauction-clipping-purchase>
```

- **params**

Set parameters for &lt;yauction-clipping-purchase />. It should be JSON string. Each fetching will attached these parameters to api. Default is `{}` (not set).

```html
<yauction-clipping-purchase
  params='{"id":"mei","sex":"M"}'
>
  ...
</yauction-clipping-purchase>
```

- **l10n**

Set localization for &lt;yauction-clipping-purchase />. It will replace some message & button text to anything you like. It should be JSON string. Developers could set `cart`、`buy`、`pickSpec` and `addToCartSuccess`.

- `cart`：button 「add to cart」text. Default is ADD TO CART.
- `buy`：button 「direct buy」text. Default is DIRECT BUY.
- `pickSpec`：Warnning message when spec not pick. Default is Pick {{spec}} please.. Developers could apply {{spec}} as replace key for message.
- `addToCartSuccess`：Notification message when add to cart finished. Default is Add to cart success..

```html
<yauction-clipping-purchase
  l10n='{"cart":"ADD TO CART","buy":"DIRECT BUY","pickSpec":"Pick {{spec}} please.","addToCartSuccess":"Add to cart success."}'
>
  ...
</yauction-clipping-purchase>
```

- **webservice**

Set web service information for &lt;yauction-clipping-purchase />. It should be JSON string. Developers could set `info`、`cart` api address here.（api address must be full path）

- `info`：api address for product information fetching.
- `cart`：api address for add product to cart fetching.

```html
<yauction-clipping-purchase
  webservice='{"info":"https://your-domain/getProductInformation","cart":"https://your-domain/getAddToCart"}'
>
  ...
</yauction-clipping-purchase>
```


## Properties

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| carturl | String | Getter / Setter for carturl. It will redirect to this url when 「direct buy」 button pressed. Default is `https://tw.bid.yahoo.com/cart`. |
| params | Object | Getter / Setter for params. Each fetching will attached these parameters to api. Default is `{}`.|
| l10n | Object | Getter / Setter for l10n. It will replace some message & button text to anything you like. Developers could set `cart`、`buy`、`pickSpec` and `addToCartSuccess`. |
| webservice | Object | Getter / Setter for webservice. Developers could set `info`、`cart` api address here.（api address must be full path） |
| open | Boolean | Getter for &lt;yauction-clipping-purchase />'s open status. |
| processing | Boolean | Getter for <yauction-clipping-purchase />'s fetching status.） |
| productInfo | Object | Getter for current <yauction-clipping-purchase />'s product information. |

## Method

| Method Signature | Description |
| ----------- | ----------- |
| show(merchandiseId) | Fetch & popup &lt;yauction-clipping-purchase />. Developers could call this method with argument > product id to popup <yauction-clipping-purchase />. Such as：element.show('100450639430') |

## Event

| Event Signature | Description |
| ----------- | ----------- |
| yauction-clipping-purchase-add-to-cart-success | Fired when &lt;yauction-clipping-purchase /> successed for adding to cart action.（button「add to cart」pressed） |
| yauction-clipping-purchase-processing | Fired when &lt;yauction-clipping-purchase /> started fetching. |
| yauction-clipping-purchase-process-finish | Fired when &lt;yauction-clipping-purchase /> finished fetching. |
| yauction-clipping-purchase-cancel | Fired when &lt;yauction-clipping-purchase /> canceled.（user closed <yauction-clipping-purchase />） |
| yauction-clipping-purchase-error | Fired when &lt;yauction-clipping-purchase /> fetching error. Develpoers could gather information through `event.detail`. |

## Reference
- [&lt;yauction-clipping-purchase />](https://blog.lalacube.com/mei/webComponent_msc-circle-progress.html)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/yauction-clipping-purchase)
- [&lt;yauction-clipping-purchase />](https://blog.lalacube.com/mei/webComponent_msc-circle-progress.html)
- [TW Yahoo! Auction](https://tw.bid.yahoo.com/)
