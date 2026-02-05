import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

const category = getParam("category"); // to ensure utils is loaded
const dataSource = new ExternalServices(category);
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

// Listen for cart updates
window.addEventListener("cartUpdated", updateCartCount);


document.addEventListener("DOMContentLoaded", () => {
  // Load product
  product.init();
  // insert header and footer - wait for it to finish before updating cart count
  // update cart count after header is loaded
  loadHeaderFooter().then(updateCartCount);
});