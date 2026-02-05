import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

document.addEventListener("DOMContentLoaded", () => {
  // load cart
  cartInit();
  // insert header and footer - wait for it to finish before updating cart count
  // update cart count after header is loaded
  loadHeaderFooter().then(updateCartCount);
});

function cartInit() {
  // Initialize the ShoppingCart class
  const cart = new ShoppingCart(
    document.querySelector(".product-list"),
    document.querySelector(".cart-total"),
  );
  // Initialize the cart display
  cart.init();
}
