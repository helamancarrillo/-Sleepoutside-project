import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter();

const element = document.querySelector(".product-list");
const cart = new ShoppingCart("addToCart", element);
cart.renderCartContents();

// cartHTML += `</ul>`;

//     const cartTotal = cartItems.reduce(
//       (total, item) => total + item.FinalPrice,
//       0,
//     );
//     cartHTML += `
//       <div class="cart-footer show">
//         <p class="item-count">Total Items: ${cartItems.length}</p>
//         <p class="cart-total">Total: $${cartTotal.toFixed(2)}</p>
//         <button class="checkout-button">Checkout</button>
//       </div>`;
//   } else {
//     cartHTML = `<p class="empty-cart-message">Your cart is empty</p>`;
//   }

//   productList.innerHTML = cartHTML;
//   attachEventListeners();
// }

// function attachEventListeners() {
//   const productList = document.querySelector(".product-list");

//   productList.addEventListener("click", function (event) {
//     const removeBtn = event.target.closest(".cart-card__remove");
//     if (removeBtn) {
//       const id = removeBtn.getAttribute("data-id");
//       removeItemFromCart(id);
//     }

//     const checkoutBtn = event.target.closest(".checkout-button");
//     if (checkoutBtn) {
//       handleCheckout();
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   renderCartContents();
// });