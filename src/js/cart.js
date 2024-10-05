import { getLocalStorage, setLocalStorage, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const productList = document.querySelector(".product-list");
  const cartItems = getLocalStorage("addToCart") || [];
  let cartHTML = "";

  if (cartItems.length > 0) {
    cartHTML = `<ul class="cart-list">`;

    cartItems.forEach((item) => {
      cartHTML += `
        <li class="cart-card">
          <div>
            <a href="/product_pages/index.html?productid=${item.Id}" class="cart-card__image">
              <img src="${item.Image}" alt="${item.Name}" />
            </a>
            <div>
              <a href="../product_pages/index.html?product=${item.Id}">
                <h2 class="card__name">${item.Name}</h2>
              </a>
              <p class="cart-card__color">${item.Colors[0].ColorName}</p>
              <p class="cart-card__quantity">Quantity: <input type="number" class="quantity-input" data-id="${item.Id}" value="${item.Quantity}" min="1" />
              <p class="cart-card__price">$${item.FinalPrice}</p>
            </div>
          </div>
          <button class="cart-card__remove" data-id="${item.Id}">
            Remove
          </button>
        </li>`;
    });

    cartHTML += `</ul>`;

    const cartTotal = cartItems.reduce((total, item) => total + item.FinalPrice * item.Quantity, 0);
    cartHTML += `
      <div class="cart-footer show">
        <p class="item-count">Total Items: ${cartItems.length}</p>
        <p class="cart-total">Total: $${cartTotal.toFixed(2)}</p>
        <button class="checkout-button">Checkout</button>
      </div>`;
  } else {
    cartHTML = `<p class="empty-cart-message">Your cart is empty</p>`;
  }

  productList.innerHTML = cartHTML;
  attachEventListeners();
}

function attachEventListeners() {
  const productList = document.querySelector(".product-list");

  productList.addEventListener("click", function (event) {
    const removeBtn = event.target.closest(".cart-card__remove");
    if (removeBtn) {
      const id = removeBtn.getAttribute("data-id");
      removeItemFromCart(id);
    }

    const checkoutBtn = event.target.closest(".checkout-button");
    if (checkoutBtn) {
      handleCheckout();
    }
  });
}

productList.addEventListener("change", function (event) {
  const quantityInput = event.target.closest(".quantity-input");
  if (quantityInput) {
    const id = quantityInput.getAttribute("data-id");
    const newQuantity = parseInt(quantityInput.value, 10);
    updateItemQuantity(id, newQuantity);
  }
});

function updateItemQuantity(id, newQuantity) {
  let cart = getLocalStorage("addToCart") || [];
  cart = cart.map((item) => {
    if (item.Id.toString() === id) {
      item.Quantity = newQuantity;
    }
    return item;
  });
  setLocalStorage("addToCart", cart);
  renderCartContents();
}

function removeItemFromCart(id) {
  let cart = getLocalStorage("addToCart") || [];
  cart = cart.filter((item) => item.Id.toString() !== id); // Assuming ID is a number
  setLocalStorage("addToCart", cart);
  renderCartContents();
}

function handleCheckout() {
  console.log("Proceeding to checkout...");
  // Add checkout functionality here
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartContents();
  renderHeaderFooter();
});
