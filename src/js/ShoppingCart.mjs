import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
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
    <span class="cart-card__remove" data-id=${item.Id}>❌</span>
  </li>`;
  
    return newItem;
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];
        // const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        // document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");

        renderListWithTemplate(cartItemTemplate, this.parentSelector, cartItems,"afterbegin",true);
        
        // add listeners to the X beside each cart item
        document.querySelectorAll(".cart-card__remove").forEach((cartElement) => {
          cartElement.addEventListener("click", () => {
            const itemId = cartElement.getAttribute("data-id");
            this.removeCartItem(itemId, this.key);
          });
        });
        calculateTotal(cartItems);
      }

      removeCartItem(idToRemove) {
        const cartItems = getLocalStorage(this.key);
        // get the array index of the item to be removed
        const index = cartItems.findIndex((item) => item.Id === idToRemove);
      
        if (index !== -1) {
          cartItems.splice(index, 1); //remove the item from the cart array
        }
      
        setLocalStorage(this.key, cartItems); //save the updated cart to localStorage
        this.renderCartContents(); //refresh the items on the page
      }
}

function calculateTotal(cartItems) {
    let cartHTML = "";
    const itemCountElement = document.querySelector(".item-count");
    const totalElement = document.querySelector(".cart-total");

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.FinalPrice,
        0,
    );
    itemCountElement.innerHTML = `Items: ${cartItems.length}`;
    totalElement.innerHTML = `Total: $${cartTotal.toFixed(2)}`;
}
   