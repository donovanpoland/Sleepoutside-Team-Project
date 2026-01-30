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
  loadHeaderFooter().then(() => {
    // other startup code
    // update cart count after header is loaded
    updateCartCount();
    // add products
    product.init();
  });
});
