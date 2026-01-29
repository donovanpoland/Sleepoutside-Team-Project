import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";

// insert header and footer - wait for it to finish before updating cart count
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    const cart = new ShoppingCart();

    // update cart count after header is loaded
    updateCartCount();
  });
});
