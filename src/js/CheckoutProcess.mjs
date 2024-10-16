import ShoppingCart from "./ShoppingCart.mjs";
import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}
// takes the items currently stored in the cart (localstorage) and returns them in a simplified form.
function packageItems(items) {
  // convert the list of products from localStorage to the simpler form required for the checkout process. Array.map would be perfect for this.
  return items.map(item => ({
    id: item.product.Id,
    price: item.product.FinalPrice,
    name: item.product.Name,
    quantity: item.quantity,
    }));
    
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemCount = 0;
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
  
    init() {
      this.list = getLocalStorage(this.key);
      this.calculateItemSummary();
    }
  
    calculateItemSummary() {
      // calculate and display the total amount of the items in the cart, and the number of items.
      const cart = new ShoppingCart(this.key);
      const cartCount = cart.calculateCartTotals();
      this.itemCount = cartCount.itemCount;
      this.itemTotal = cartCount.cartTotal;

      const subCount = document.querySelector(this.outputSelector + " #item-count")
      const subSel = document.querySelector(this.outputSelector + " #subtotal")
       subCount.innerHTML = `${this.itemCount}`
      subSel.innerHTML = `$${this.itemTotal.toFixed(2)}`
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      
        if (this.itemCount > 0) {
          this.shipping = 10 + (this.itemCount - 1) * 2;
        }
        
        this.tax = this.itemTotal * 0.06;

        this.orderTotal = this.itemTotal + this.shipping + this.tax;
      
      // display the totals.
      this.displayOrderTotals();
    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const subShipping = document.querySelector(this.outputSelector + " #shipping")
      const subTax = document.querySelector(this.outputSelector + " #tax")
      const subTotal = document.querySelector(this.outputSelector + " #order-total")

      subShipping.innerHTML = `$${this.shipping.toFixed(2)}`
      subTax.innerHTML = `$${this.tax.toFixed(2)}`
      subTotal.innerHTML = `$${this.orderTotal.toFixed(2)}`
    }

    async checkout(form) {
      // build the data object from the calculated fields, the items in the cart, and the information entered into the form
      const json = formDataToJSON(form);
      // add totals, and item details
      json.orderDate = "2021-01-27T18:18:26.095Z" //new Date();
      json.orderTotal = "298.91" //this.orderTotal;
      json.tax = "12" //this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);

      // console.log(json);
      
      // call the checkout method in our ExternalServices module and send it our data object.
      try {
        const res = await services.checkout(json);
        console.log(res);
        setLocalStorage("addToCart", []);
        location.assign("/checkout/success.html");
      } catch (err) {
        removeAllAlerts();

        for (let message in err.message) {
          alertMessage(err.message[message], true);
        }

        // console.log(err);
      }
        
      
    }
  }

    
  