import { getLocalStorage } from "./utils.mjs";


export default class CheckoutProcess{
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
    //this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const subtotal = parseFloat(getLocalStorage("subtotal"));
    console.log(typeof(subtotal));
    return subtotal;
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (calculateItemSubTotal() * 0.06);
    console.log(tax);
    this.shipping = 10.00 + ((this.list.length() -1) * 2);
    this.orderTotal = this.shipping + this.tax;

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const subtotalid = document.querySelector(`${this.outputSelector} #subtotal`);
    const tax = document.querySelector(`${this.outputSelector} #tax`);

    const subtotal = calculateItemSubTotal();
    
    subtotalid.innerText = `$${subtotal}`;
    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}