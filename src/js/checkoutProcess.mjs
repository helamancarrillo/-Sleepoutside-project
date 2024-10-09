import { getLocalStorage } from "./utils.mjs";
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
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
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
        this.itemTotal = this.list.reduce((total, item) => total + item.FinalPrice, 0);
        
  
    }
  
    calculateOrdertotal() {
      // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      this.shipping = 10 + (this.list.length - 1) * 2;
      this.tax = (this.itemTotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();

    }
  
    displayOrderTotals() {
      // once the totals are all calculated display them in the order summary page
      const itemTotalSel = document.querySelector("#item-total")
      const shippingSel = document.querySelector("#shipping")
      const taxSel = document.querySelector("#tax")
      const totalSel = document.querySelector("#order-total")

      itemTotalSel.innerHTML += `$${this.itemTotal.toFixed(2)}`
      shippingSel.innerHTML += `$${this.shipping.toFixed(2)}`
      taxSel.innerHTML += `$${this.tax}`
      totalSel.innerHTML += `$${this.orderTotal}`

  
    }
    async checkout() {
      const formElement = document.forms["checkout"];
  
      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);
      try {
        const res = await services.checkout(json);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }

  }
