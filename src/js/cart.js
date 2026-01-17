import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index),
  );// Generate HTML for each cart item with its index

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
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
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
}

renderCartContents();
