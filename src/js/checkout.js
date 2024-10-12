import { loadHeaderFooter } from "./utils.mjs";

import CheckoutProcess from './checkoutProcess.mjs';


loadHeaderFooter();

const newCheckout = new CheckoutProcess("addToCart", ".checkout-summary");
newCheckout.init();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  newCheckout.checkout();
});
