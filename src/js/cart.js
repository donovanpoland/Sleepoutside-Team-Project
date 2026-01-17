import { getLocalStorage, setLocalStorage,updateCartCount } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Add event listeners to delete buttons
  document.querySelectorAll(".cart-card__delete").forEach((btn) => {
    btn.addEventListener("click", deleteItem);
  });
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <button class="cart-card__delete" data-id="${item.Id}" title="Remove item">❌</button>
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

function deleteItem(e) {
  const itemId = e.target.dataset.id;
  let cartItems = getLocalStorage("so-cart");
  cartItems = cartItems.filter((item) => item.Id !== itemId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
  //update cart count badge after item is deleted
  updateCartCount();
}
updateCartCount();
renderCartContents();
