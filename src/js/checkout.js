import CheckoutProcess from "./CheckoutProcess.mjs";
import { updateCartCount, loadHeaderFooter, getLocalStorage } from "./utils.mjs";

// insert header and footer - wait for it to finish before updating cart count
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    const checkout = new CheckoutProcess();
    checkout.init();
    checkout.calculateItemSubTotal();
    checkout.calculateOrderTotal();
    checkout.displayOrderTotals();
    // update cart count after header is loaded
    updateCartCount();
  });
});
