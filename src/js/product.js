import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Get cart items from local storage or init an empty array
  const cartItems = getLocalStorage("so-cart") || [];
  // Add product to cart
  cartItems.push(product);
  // Save back to storage
  setLocalStorage("so-cart", cartItems);
}

// Add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
