import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // setLocalStorage("so-cart", product); <- this was saving a single item at a time, overriding the previous item 
  let cart = getLocalStorage("so-cart") || [] // turning the single item into an array 
  cart.push(product); // adds new product to the array
  setLocalStorage("so-cart", cart) // grabes the full list (array) 
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
