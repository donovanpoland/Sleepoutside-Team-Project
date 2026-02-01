import {
  getLocalStorage,
  setLocalStorage,
  updateCartCount,
  loadHeaderFooter,
} from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

function renderCartContents() {
  // Get cart from local storage
  const cartItems = getLocalStorage("so-cart") || [];
  // Get total
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0,
  );
  // Get full cart item and display
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  ); // Generate HTML for each cart item with its index

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // Add event listeners to delete buttons
  document.querySelectorAll(".cart-card__delete").forEach((btn) => {
    btn.addEventListener("click", deleteItem);
  });
  // Update total
  if (cartItems) {
    document.querySelector(".cart-total").textContent =
      `Total: $${total.toFixed(2)}`;
  }
}


// Delete item from cart by index in local storage and re-render cart
function deleteItem(e) {
  const itemIndex = e.target.dataset.index;
  let cartItems = getLocalStorage("so-cart");
  cartItems.splice(itemIndex, 1); // Remove 1 item at the specified index
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  //update cart count badge after item is deleted
  updateCartCount();
}

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
