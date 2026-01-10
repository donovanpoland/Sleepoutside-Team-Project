import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

// Add product to cart in localStorage
function addProductToCart(product) {
  let cart = JSON.parse(localStorage.getItem("so-cart")) || [];
  cart.push(product);
  setLocalStorage("so-cart", cart);
}

// Handle Add to Cart button click
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Listen for Add to Cart clicks
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
