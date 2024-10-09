import { getLocalStorage } from "./utils.mjs";

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
  }
