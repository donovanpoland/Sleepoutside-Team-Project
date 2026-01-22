import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
//import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
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
