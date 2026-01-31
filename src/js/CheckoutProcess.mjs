import { alertMessage, getLocalStorage, setLocalStorage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// helper function to convert form data to JSON object to send to server
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) 
// and returns them in a simplified form.
function packageItems(items) {
  // map the items to a simplified object
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: item.quantity || 1,
    };
  });
  console.log(simplifiedItems);
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
    // calculate and display the total amount
    //of the items in the cart, and the number of items.
    const summaryElement = document.querySelector(
      this.outputSelector + " #cartTotal"
    );
    const itemNumElement = document.querySelector(
      this.outputSelector + " #num-items"
    );
    // calculate the number of items in the cart
    itemNumElement.innerText = this.list.map((item) => item.quantity || 1).reduce((sum, item) => sum + item, 0) || 0;
    // calculate the total of all the items in the cart
    const amounts = this.list.map((item) => item.FinalPrice * (item.quantity || 1));
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    summaryElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  //calculateItemSubTotal() {
  //  // calculate and display the total dollar amount of the items in the cart, and the number of items.
  //  const subtotal = parseFloat(getLocalStorage("subtotal"));
  //  console.log(typeof (subtotal));
  //  return subtotal;
  //}

  calculateOrderTotal() {
    // calculate the shipping and tax amounts. 
    // Then use them to along with the cart total to figure out the order total
    this.tax = (this.itemTotal * .06);
    this.shipping = 10 + (this.list.length - 1) * 2;
    this.orderTotal = (
      parseFloat(this.itemTotal) +
      parseFloat(this.tax) +
      parseFloat(this.shipping)
    )
    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #orderTotal`);

    tax.innerText = `$${this.tax.toFixed(2)}`;
    shipping.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
  async checkout() {
    // get the form element data by the form name
    const formElement = document.forms["checkout"];
    const order = formDataToJSON(formElement);
    // convert the form data to a JSON order object using the formDataToJSON function
    // takes a form element and returns an object where the key is the "name" of the form input.
    order.orderDate = new Date().toISOString();
    order.orderTotal = this.orderTotal;
    order.tax = this.tax;
    order.shipping = this.shipping;
    order.items = packageItems(this.list);
    console.log(order);
    // populate the JSON order object with the order Date, orderTotal, tax, shipping, and list of items
    // call the checkout method in the ExternalServices module and send it the JSON order data.
    try {
      const response = await services.checkout(order);
      console.log("Checkout result:", response);
      // on success redirect to the checkout success page
      window.location.href = "./success.html";
      // clear the cart
      setLocalStorage(this.key, []);
    } catch (error) {
      removeAllAlerts();
      for (let message in error.message) {
        alertMessage(error.message[message]);
      }
      console.error("Error during checkout:", error);
    }
  }
}
