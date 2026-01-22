import { getParam, updateCartCount, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
//import { getParam } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

// insert header and footer - wait for it to finish before updating cart count
await loadHeaderFooter();

// update cart count after header is loaded
updateCartCount();

// add products
product.init();

// Listen for cart updates
window.addEventListener("cartUpdated", updateCartCount);
