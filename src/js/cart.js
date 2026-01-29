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
  // Update total
  if (cartItems) {
    ShoppingCart.updateCartTotal();
  }

  // Get full cart item and display
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  ); // Generate HTML for each cart item with its index

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  // Add event listeners to delete buttons
  document.querySelectorAll(".cart-card__delete").forEach((btn) => {
    btn.addEventListener("click", deleteItem);
  });

}

// Template for a cart item with index for deletion
function cartItemTemplate(item, index) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__delete" data-index="${index}" title="Remove item">❌</button>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimaryMedium}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${item.quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
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
