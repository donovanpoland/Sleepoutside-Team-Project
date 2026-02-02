import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// insert header and footer - wait for it to finish before updating cart count
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // Initialize the ShoppingCart class
    const cart = new ShoppingCart(
      document.querySelector(".product-list"),
      document.querySelector(".cart-total"),
    );

    // Initialize the cart display
    cart.init();

    // update cart count after header is loaded
    updateCartCount();
  });
});
