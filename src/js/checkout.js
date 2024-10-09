import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const myCheckout = new CheckoutProcess("addToCart",".checkout-form")
myCheckout.init();
myCheckout.calculateOrdertotal();

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    myCheckout.checkout();
})

