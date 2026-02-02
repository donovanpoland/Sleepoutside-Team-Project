import CheckoutProcess from "./CheckoutProcess.mjs";
import {
  updateCartCount,
  loadHeaderFooter,
  getLocalStorage,
  alertMessage,
} from "./utils.mjs";

// insert header and footer - wait for it to finish before updating cart count
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    //const checkout = new CheckoutProcess();
    //checkout.init();
    //checkout.calculateItemSubTotal();
    //checkout.calculateOrderTotal();
    //checkout.displayOrderTotals();
    const order = new CheckoutProcess("so-cart", ".checkout-summary");
    order.init();
    //Add event listener to trigger calculateOrderTotal when the user changes the Zip code
    document
      .querySelector("#zip")
      .addEventListener("blur", order.calculateOrderTotal.bind(order));
    //add event listener for submit button
    document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
      e.preventDefault();
      // Prevent checkout if cart is empty
      const cart = getLocalStorage("so-cart") || [];
      if (!cart.length) {
        alertMessage("Your cart is empty. Add items before checking out.");
        return;
      }

      const myForm = document.forms[0];
      const check_status = myForm.checkValidity();
      myForm.reportValidity();
      if (!check_status) {
        alertMessage("Please complete the required fields in the form.");
        return;
      }

      order.checkout();
    });
    // update cart count after header is loaded
    updateCartCount();
  });
});
