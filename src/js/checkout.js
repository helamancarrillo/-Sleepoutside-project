import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const checkout = new CheckoutProcess("addToCart",".checkout-form")
checkout.init();
checkout.calculateOrdertotal();

