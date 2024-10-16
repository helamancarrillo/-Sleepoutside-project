import { getLocalStorage, setLocalStorage, renderListWithTemplate } from "./utils.mjs";

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.product.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.product.Name}</h2>
    </a>
    <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: ${item.quantity}</p>
    <p class="cart-card__price">$${item.product.FinalPrice}</p>
    <span class="cart-card__remove" data-id=${item.product.Id}>❌</span>
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

        renderListWithTemplate(cartItemTemplate, this.parentSelector, cartItems,"afterbegin",true);
        
        // add listeners to the X beside each cart item
        document.querySelectorAll(".cart-card__remove").forEach((cartElement) => {
          cartElement.addEventListener("click", () => {
            const itemId = cartElement.getAttribute("data-id");
            this.removeCartItem(itemId, this.key);
          });
        });
        const cartTotals = this.calculateCartTotals()

        const itemCountElement = document.querySelector(".item-count");
        const totalElement = document.querySelector(".cart-total");

        itemCountElement.innerText = `Items: ${cartTotals.itemCount}`;  
        totalElement.innerHTML = `Total: $${cartTotals.cartTotal.toFixed(2)}`;
      }

      addToCart(prodArray) {
        const cartItems = getLocalStorage(this.key) || []; // Retrieve existing items
        const index = cartItems.findIndex((item) => item.product.Id === prodArray.Id);

        let updatedCart = cartItems;
        
        if (index === -1) { //if item not in cart, then add it
          const newItem = {
            product: prodArray,
            quantity: 1
          }
          updatedCart.push(newItem);

        } else { //if item in cart, increase quantity
          updatedCart[index].quantity += 1;
        }
        
        setLocalStorage(this.key, updatedCart); // Save back to local storage
    }

      removeCartItem(idToRemove) {
        const cartItems = getLocalStorage(this.key);
        // get the array index of the item to be removed
        const index = cartItems.findIndex((item) => item.product.Id === idToRemove);
      
        if (index !== -1) {
          cartItems.splice(index, 1); //remove the item from the cart array
        }
      
        setLocalStorage(this.key, cartItems); //save the updated cart to localStorage
        this.renderCartContents(); //refresh the items on the page
      }

      calculateCartTotals() {
        const cartItems = getLocalStorage(this.key) || [];

        return cartItems.reduce((total, item) => {
          total.itemCount += item.quantity;
          total.cartTotal += item.product.FinalPrice * item.quantity
          return total;
        },
      { itemCount: 0, cartTotal: 0 } //initialize the totals
    );
      }
}





   