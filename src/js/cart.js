import { getLocalStorage } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  function renderCartContents() {
    const cartItems = getLocalStorage("addToCart");

    function cartItemTemplate(item) {
      return `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
          <img
            src="${item.Image}"
            alt="${item.Name}"
          />
        </a>
        <a href="#">
          <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
      </li>`;
    }

    if (cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");

      const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice, 0);

      // Show the cart footer element
      const cartFooterElement = document.querySelector(".cart-footer");
      cartFooterElement.classList.remove("total-hide");
      cartFooterElement.querySelector(".item-count").innerHTML = `Items: ${cartItems.length}`;
      cartFooterElement.querySelector(".cart-total").innerHTML = `Total: $${cartTotal}`;
    } else {
      document.querySelector(".product-list").innerHTML = `<p class="empty-cart-message">Your cart is empty</p>`;
    }
  }

  renderCartContents();
});