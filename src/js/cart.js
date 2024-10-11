import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();

const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartContents();
