import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
//import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";


const dataSource = new ProductData("tents");
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);



/*function addProductToCart(product) {
  // Get cart items from local storage or init an empty array
  const cartItems = getLocalStorage("so-cart") || [];
  // Add product to cart
  cartItems.push(product);
  // Save back to storage
  setLocalStorage("so-cart", cartItems);
}*/

// Add to cart button event handler
async function addToCartHandler(e) {
  product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

console.log(dataSource.findProductById(productId));
product.init();



// Add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
