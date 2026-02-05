import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount, loadHeaderFooter, getParam } from "./utils.mjs";

// Get category from URL parameter, default to "tents"
const category = getParam("category") || "tents";
const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

const dataSource = new ExternalServices(category);
const element = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, element);
myList.categoryTitle = categoryTitle;

// Listen for cart updates from other pages
window.addEventListener("cartUpdated", updateCartCount);

myList.init();

// insert header and footer - wait for it to finish before updating cart count
// update cart count after header is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadHeaderFooter().then(updateCartCount);
});
