import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter } from "./utils.mjs";
import Alert from "./Alert.js";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);
const alert = new Alert("/json/Alerts.json");

// Listen for cart updates from other pages
window.addEventListener("cartUpdated", updateCartCount);

// insert header and footer - wait for it to finish before updating cart count
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(() => {
    // other startup code
    // update cart count after header is loaded
    updateCartCount();
    productList.init();
    alert.init();
  });
});
